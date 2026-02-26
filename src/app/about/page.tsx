import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import AboutUs from "@/components/layout/HomePage/AboutUs/AboutUs";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <AboutUs />
            </main>
            <Footer />
        </div>
    );
}
