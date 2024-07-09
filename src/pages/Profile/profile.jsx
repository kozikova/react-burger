import { ProfileMenu } from "../../components/profile/profile-menu/profile-menu";
import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";

export const Profile = () => {
  return (
    <main>
      <section className="wrapper-columns-center">
        <ProfileMenu />
        <Outlet />
      </section>
    </main>
  );
};

export default Profile;
