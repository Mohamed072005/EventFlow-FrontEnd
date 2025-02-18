"use client"

import { Card, CardContent, CardMedia, Typography, Button, Box, LinearProgress, Chip } from "@mui/material"
import { LocationOn, CalendarToday, Group } from "@mui/icons-material"
import { format } from "date-fns"
import EventImage from '../../public/images/React-icon.svg.png'

interface EventCardProps {
    id: string
    title: string
    description: string
    date: Date
    location: string
    participants: number
    maxParticipants: number
    imageUrl: string
}

export function EventCard({
                              id,
                              title,
                              description,
                              date,
                              location,
                              participants,
                              maxParticipants,
                              imageUrl,
                          }: EventCardProps) {
    const participationProgress = (participants / maxParticipants) * 100
    const isAlmostFull = participationProgress >= 80
    const isFull = participants >= maxParticipants

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image='https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg'
                    alt={title}
                    sx={{
                        objectFit: 'cover',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    {isFull && (
                        <Chip
                            label="Full"
                            color="error"
                            size="small"
                            sx={{ backgroundColor: 'error.main', color: 'white' }}
                        />
                    )}
                    {!isFull && isAlmostFull && (
                        <Chip
                            label="Almost Full"
                            color="warning"
                            size="small"
                            sx={{ backgroundColor: 'warning.main', color: 'white' }}
                        />
                    )}
                </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {description}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: 'column', gap: 1.5, mb: 'auto' }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarToday fontSize="small" sx={{ color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            {format(new Date(date), "MMM d, yyyy")}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocationOn fontSize="small" sx={{ color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            {location}
                        </Typography>
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <Group fontSize="small" sx={{ color: 'primary.main' }} />
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                {participants} / {maxParticipants} participants
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={participationProgress}
                            sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(0,0,0,0.08)',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: isAlmostFull ? 'warning.main' : 'primary.main',
                                },
                            }}
                        />
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    href={`/events/${id}`}
                    sx={{
                        mt: 3,
                        textTransform: 'none',
                        borderRadius: 2,
                        py: 1,
                        fontWeight: 600,
                        '&:hover': {
                            transform: 'scale(1.02)',
                        },
                    }}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    )
}