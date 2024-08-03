import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import Navbar from "@/components/navigation/navbar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="relative">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 pt-20">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default MainLayout;

// import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
// import Navbar from "@/components/navigation/navbar";

// const MainLayout = async ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="h-screen flex flex-col z-30">
//       <div className="fixed top-0 left-0 right-0 ">
//         <Navbar />
//       </div>
//       <div className="flex-1 pt-16 flex overflow-hidden">
//         <div className="hidden md:flex w-[72px] flex-shrink-0 flex-col fixed inset-y-0 pt-16">
//           <NavigationSidebar />
//         </div>
//         <main className="flex-1 overflow-y-auto md:pl-[72px]">
//           <div className="container mx-auto p-4">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
