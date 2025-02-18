import {MainLayout} from "@/components/layouts/MainLayout";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <MainLayout >
                {children}
            </MainLayout>
        </>
    )
}

export default HomeLayout;