import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = context.req.cookies.jwt;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const ProfilePage = () => {
  return (
    <div>
      <h1>This is the profile page</h1>
    </div>
  );
};

export default ProfilePage;
