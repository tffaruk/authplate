import UpdateForm from "@/components/Form/UpdateForm";
import { authOptions } from "@/lib/auth";
import { fetchUser } from "@/lib/fetchUser";
import SidebarContainer from "@/partials/SidebarContainer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = await fetchUser(session?.user?.email!);

  if (!session) {
    redirect("/login");
  } else if (user.isValid === false) {
    redirect("/");
  }
  return (
    <SidebarContainer user={user}>
      <div className="bg-white rounded-lg px-8 py-12">
        <div className="mb-12">
          <UpdateForm user={user} />
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Dashboard;
