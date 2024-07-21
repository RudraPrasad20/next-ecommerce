import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      console.log("token", token);
      // only admin can access the dashborad , by default a new user will be a customer
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      } else if (req.nextUrl.pathname.startsWith("/account")) {
        return token?.role === "customer";
      } else {
        return false;
      }
    },
  },
});

export const config = {
  matcher: ["/admin(/.*)?", "/account(/.*)?"],
};
