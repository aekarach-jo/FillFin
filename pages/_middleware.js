import { useRouter } from "next/router";
import { NextResponse, NextRequest } from "next/server";


export async function middleware(request = NextRequest , response = NextResponse) {
  // const base_url = request.nextUrl.origin;
  // const cookies = request.cookies;
  // if(cookies.user_code){
  //   // return NextResponse.redirect(`${base_url}/member`);
  // }
  /* if have cookie */
  // if (cookies) {
  //   /* if have access_token */
  //   if (cookies.access_token) {
  //     const access_url = `${apiUrl}/member/checkToken/${cookies.access_token}`;
  //     const res = await fetch(access_url);
  //     const result = await res.json();
  //     /* if result status is not true */
  //     if (result.status) {
  //       return NextResponse.next();
  //     } else if (cookies.refresh_token) {
  //       /* send refresh_token to generate new access_token */
  //       const refresh_url = `${apiUrl}/member/getToken/${cookies.refresh_token}`;
  //       const res = await fetch(refresh_url);
  //       const result = await res.json();
  //       if (result.status) {
  //         /* return false with set new access_token in cookie */
  //         return NextResponse.next().cookie("access_token", result.data);
  //       }
  //     }
  //   }
  // }
  {
    /* if path not /login will redirect to /login */
    // if (
    //   base_url.pathname != "/" &&
    //   base_url.pathname != "/login" &&
    //   base_url.pathname != "/member/register" &&
    //   base_url.pathname != "/store/register" && 
    //   base_url.pathname != "/assets/*"
    // ) {
    //   base_url.pathname = "/login";
    //   return NextResponse.redirect(base_url);
    // }
  }
}
