"use client";
import { SignIn, SignUp, SignInButton } from "@clerk/nextjs";
import { GraduationCap, Users, Book, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-lg">
      <div className="text-blue-200 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const UniversityPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to GeeksForum</h1>
          <p className="text-xl">
            A place for Geeks of Shiv Nadar university.Where Students,
            Professors, and TAs Come Together
          </p>
        </header>

        <main className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">IMAGINE A PLACE...</h2>
            <p className="text-lg mb-8">
              ...where you can collaborate on projects, attend virtual lectures,
              and engage in meaningful discussions. A place that makes learning
              and teaching easier and more interactive than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SignInButton>
                <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
                  Join Now
                  {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
                </button>
              </SignInButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FeatureCard
              icon={<GraduationCap size={40} />}
              title="Easy Course Management"
              description="Streamline your course organization and materials distribution."
            />
            <FeatureCard
              icon={<Users size={40} />}
              title="Collaborative Learning"
              description="Engage in group projects and peer-to-peer learning experiences."
            />
            <FeatureCard
              icon={<Book size={40} />}
              title="Virtual Classrooms"
              description="Attend lectures and participate in discussions from anywhere."
            />
            <FeatureCard
              icon={<MessageCircle size={40} />}
              title="Instant Communication"
              description="Connect with professors, TAs, and fellow students in real-time."
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UniversityPage;
