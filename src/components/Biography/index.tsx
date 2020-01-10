import React, { Fragment, useContext } from "react";
import Section from "../Section";
import Header from "../Header";
import Footer from "../Footer";
import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";
import Signup from "components/Signup";

interface Profile {
  name: string;
  image: string;
  biography: string;
}
const Biography = () => {
  const { authState } = useContext(AuthContext);
  
  const {
    data: { users }
  } = useContext(DataContext);

  if (!users.length || !authState) {
    return <Signup />;
  }
  console.log(users, authState)
  const user = users.filter((user: any) => user._id === authState.id)[0];

  const { firstName, lastName, bio, imageUrl } = user;
  const fullname = firstName + " " + lastName;

  return (
    <Fragment>
      <Header />
      <Section
        imgUrl={imageUrl}
        title={fullname}
        href="/about"
        btnText="read more"
        flexDirect="row"
        borderRadius="50%"
        text={bio}
      />
      <Footer />
    </Fragment>
  );
};

export default Biography;
