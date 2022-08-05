import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* index หน้าหลัก */}
        <link rel="stylesheet" href="/assets/css/index.min.css" />

        {/* หน้า Login */}
        <link rel="stylesheet" href="/assets/css/login.min.css" />

        {/* หน้า member register */}
        <link rel="stylesheet" href="/assets/css/apply.min.css" />

        {/* หน้า store register */}
        <link rel="stylesheet" href="/assets/css/apply-stone.min.css" />

        {/* หน้า member */}
        <link rel="stylesheet" href="/assets/css/product.min.css" />

        {/* หน้า payment */}
        <link rel="stylesheet" href="/assets/css/detail-pay.min.css" />

        {/* หน้า Store-premium */}
        {/* <link rel="stylesheet" href="/assets/css/stone-exclusive.min.css" /> */}

        {/* หน้า Store-member */}
        <link rel="stylesheet" href="/assets/css/detail-stone.min.css" />

        {/* หน้า Store */}
        <link rel="stylesheet" href="/assets/css/sell-product.min.css" />
        <link rel="stylesheet" href="/assets/css/popup-edit.min.css" />

        {/* หน้า Cart */}
        <link rel="stylesheet" href="/assets/css/shopping-cart.min.css" />

        {/* หน้า preview product */}
        <link rel="stylesheet" href="/assets/css/detail-product.min.css" />

        {/* หน้า Pay Sunmmary */}
        <link rel="stylesheet" href="/assets/css/pay-summery.min.css" />

        {/* หน้า Oder member */}
        <link rel="stylesheet" href="/assets/css/order-list.min.css" />

        {/* หน้า content */}
        <link rel="stylesheet" href="/assets/css/terms-service.min.css" />

        {/* All using */}
        <link rel="stylesheet" href="/assets/css/global.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper@8/swiper-bundle.min.css"
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
