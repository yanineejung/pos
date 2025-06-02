import Image from "next/image";
import styles from "./page.module.css";
// import Product from "../../public/components/molecule/Card/ProductCard";
import ProductTemplate from "../../public/components/template/ProductTemplate";
import CheckoutTemplate from "../../public/components/template/CheckoutTemplate";
import Topbar from "../../public/components/molecule/Layout/Topbar";
const MockData = {
  success: true,
  totalProduct: 15,
  productList: [
    {
      no: 1,
      productId: "G099191-TOP02",
      productName:
        "โต๊ะปรับระดับ รุ่น Health-Max Controller ขนาด 140*75 cm. | Ergonomic Adjustable Desk",
      category: "table",
      price: 19900,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2023/11/2024012_%E0%B8%9B%E0%B8%81%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0-TBS04-%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A%E0%B9%84%E0%B8%8B%E0%B8%95%E0%B9%8C-01.jpg",
      stock: 50,
    },
    {
      no: 2,
      productId: "G099191-TOP01",
      productName:
        "โต๊ะปรับระดับ รุ่น Health-Max Controller ขนาด 120*60 cm. | Ergonomic Adjustable Desk",
      category: "table",
      price: 17999,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2023/05/20230417_%E0%B8%9B%E0%B8%81_MKP_TBS04_03.jpg",
      stock: 10,
    },
    {
      no: 3,
      productId: "G099191-TOP03",
      productName:
        "โต๊ะปรับระดับ รุ่น Health-Max Controller ขนาด 160*80 cm. | Ergonomic Adjustable Desk",
      category: "table",
      price: 21990,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2023/11/2024012_%E0%B8%9B%E0%B8%81%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0-TBS04-%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A%E0%B9%84%E0%B8%8B%E0%B8%95%E0%B9%8C-05.jpg",
      stock: 3,
    },
    {
      no: 4,
      productId: "G099191-TOP04",
      productName:
        "โต๊ะปรับระดับ รุ่น Health-Max Controller ขนาด 200*85 cm. | Ergonomic Adjustable Desk",
      category: "table",
      price: 23999,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2023/11/2024012_%E0%B8%9B%E0%B8%81%E0%B9%82%E0%B8%95%E0%B9%8A%E0%B8%B0-TBS04-%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A%E0%B9%84%E0%B8%8B%E0%B8%95%E0%B9%8C-06.jpg",
      stock: 0,
    },
    {
      no: 5,
      productId: "G099191-TOP05",
      productName:
        "โต๊ะปรับขนาดเพื่อสุขภาพ L-Shaped ขนาด 180x60x108 cm. | Ergonomic L-Shaped Desk",
      category: "table",
      price: 21999,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2022/05/shape_L_web-01-180x60x108.jpg",
      stock: 0,
    },
    {
      no: 6,
      productId: "G099191-EMBRACE-P-WH",
      productName: "เก้าอี้สุขภาพ รุ่น Embrace Plus (White) | Ergonomic Chair",
      category: "chair",
      price: 21999,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2023/02/20230130_%E0%B8%9B%E0%B8%81MKP_Embrace-Plus-GY_03.jpg",
      stock: 12,
    },
    {
      no: 7,
      productId: "G099191-EMBRACE-P",
      productName: "เก้าอี้สุขภาพ รุ่น Embrace Plus (Black) | Ergonomic Chair",
      category: "chair",
      price: 21999,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2023/02/20230130_%E0%B8%9B%E0%B8%81MKP_Embrace-Plus-BK_03.jpg",
      stock: 5,
    },
    {
      no: 8,
      productId: "G099191-EMBRACE",
      productName: "เก้าอี้ทำงานเพื่อสุขภาพ รุ่น EMBRACE | Ergonomic Chair",
      category: "chair",
      price: 17999,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2022/05/Cover_MKP_Embrace_white_and_black-06.jpg",
      stock: 2,
    },
    {
      no: 9,
      productId: "G099191-FROZEN",
      productName: "เก้าอี้ทำงานเพื่อสุขภาพรุ่น FROZEN | Ergonomic Chair",
      category: "chair",
      price: 8999,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2023/01/20240205-114411-1.jpg",
      stock: 3,
    },
    {
      no: 10,
      productId: "G099191-ENCLOSE-P",
      productName: "เก้าอี้สุขภาพรุ่น Enclose Plus | Ergonomics Chair",
      category: "chair",
      price: 21999,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2023/02/20230216_%E0%B8%9B%E0%B8%81MKP_Enclose_03.jpg",
      stock: 0,
    },
    {
      no: 11,
      productId: "G097172-H06-BL",
      productName: "เบาะรองหลังทรงสูง | Healthy Back",
      category: "cushion",
      price: 699,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2019/12/AW_%E0%B9%80%E0%B8%9A%E0%B8%B2%E0%B8%B0Colourful_h06_BL.jpg",
      stock: 1255,
    },
    {
      no: 12,
      productId: "G097172-EC01-CT",
      productName:
        "เบาะรองหลัง รุ่นเออร์โกคุชชั่น | Ergocushion Series Healthy Back",
      category: "cushion",
      price: 1299,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2020/08/Template_bewell_SKU_EC01-1.jpg",
      stock: 777,
    },
    {
      no: 13,
      productId: "G097172-EC02-CT",
      productName:
        "เบาะรองนั่ง รุ่นเออร์โกคุชชั่น | Ergocushion Series Healthy Seat",
      category: "cushion",
      price: 1199,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2020/08/Template_bewell_SKU_EC02-1.jpg",
      stock: 888,
    },
    {
      no: 14,
      productId: "G097172-HT001-BK",
      productName: "เบาะรองหลังทรงสูง | Healthy Back",
      category: "cushion",
      price: 599,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2018/12/AW_%E0%B9%80%E0%B8%9A%E0%B8%B2%E0%B8%B0ColourfulH11_black.jpg",
      stock: 0,
    },
    {
      no: 15,
      productId: "G097172-HP002-GY",
      productName:
        "Bewell Premium Nap Pillow | หมอนงีบอเนกประสงค์ รุ่นพรีเมียม Charcoal Edition",
      category: "cushion",
      price: 499,
      imageUrl:
        "https://www.bewellstyle.com/wp-content/uploads/2020/04/TempSet_HP002.jpg",
      stock: 2,
    },
  ],
};
export default function Home() {
  // console.log(MockData.productList);
  return (
    <>
      <Topbar />
      <div className={styles["page"]}>
        <div className={styles["product-section"]}>
          <ProductTemplate itemList={MockData.productList} />
        </div>
        <div className={styles["checkout-section"]}>
          <CheckoutTemplate />
        </div>
      </div>
    </>
  );
}
// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>src/app/page.js</code>.
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
