"use client";

import SignInPage from "@/components/SignInPage/SignInPage";  // Import the SignInPage component
import ClientWrapper from "@/components/ClientWrapper";      // Import the ClientWrapper component

export default function SignInPageWrapper() {
  return (
    <ClientWrapper hideNavbar={true}> {/* Pass hideNavbar prop to hide the navbar */}
      <SignInPage /> {/* Render the SignInPage component */}
    </ClientWrapper>
  );
}
