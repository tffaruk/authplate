import UpdateForm from "@/components/Form/UpdateForm";
import { authOptions } from "@/lib/auth";
import { fetchUserByEmail } from "@/lib/fetchUser";
import SidebarContainer from "@/partials/SidebarContainer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = await fetchUserByEmail();
  const {
    data: { isValid },
  } = user;

  if (!session) {
    redirect("/login");
  } else if (isValid === false) {
    redirect("/");
  }
  return (
    <SidebarContainer user={user.data}>
      <div className="bg-white rounded-lg px-8 py-12">
        <div className="mb-12">
          <UpdateForm user={user.data} />
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Dashboard;
