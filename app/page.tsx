import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MainContent } from "@/components/sections/main-content"

const MOCK_DEALS = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    description: "Latest iPhone with 256GB storage and ProMotion display",
    category: "Electronics",
    store: "Sharaf DG",
    location: [23.5859, 58.4059] as [number, number],
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-select?wid=940&hei=1112&fmt=png-alpha",
    price: 499.990,
    originalPrice: 599.990,
  },
  {
    id: "2",
    title: "Nike Air Max 2024",
    description: "Premium comfort with latest cushioning technology",
    category: "Fashion",
    store: "Namshi",
    location: [23.5932, 58.4089] as [number, number],
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61f8f0f8-a35c-4f41-a9a8-43f2a9770668/air-max-1-shoes-RJPH0L.png",
    price: 59.990,
    originalPrice: 89.990,
  },
  {
    id: "3",
    title: "Samsung 65\" OLED TV",
    description: "4K Ultra HD Smart TV with HDR",
    category: "Electronics",
    store: "Lulu",
    location: [23.5880, 58.4001] as [number, number],
    image: "https://images.samsung.com/is/image/samsung/p6pim/levant/qe65s95cauxmr/gallery/levant-oled-s95c-qe65s95cauxmr-535265354?$1300_1038_PNG$",
    price: 899.990,
    originalPrice: 1299.990,
  },
  {
    id: "4",
    title: "Fresh Organic Groceries",
    description: "Bundle of fresh organic vegetables and fruits",
    category: "Groceries",
    store: "Carrefour",
    location: [23.5902, 58.4045] as [number, number],
    image: "https://www.carrefouruae.com/cdn-cgi/image/width=1920,fit=contain,format=auto/mena/assets/images/Fresh-Food-1920x450-EN.jpg",
    price: 29.990,
    originalPrice: 49.990,
  },
  {
    id: "5",
    title: "PlayStation 5 Bundle",
    description: "PS5 Console with 2 Controllers and 3 Games",
    category: "Gaming",
    store: "Amazon UAE",
    location: [23.5845, 58.4078] as [number, number],
    image: "https://m.media-amazon.com/images/I/51eOztNdCkL._AC_SX679_.jpg",
    price: 399.990,
    originalPrice: 499.990,
  },
  {
    id: "6",
    title: "MacBook Air M3",
    description: "Latest MacBook with M3 chip and 512GB SSD",
    category: "Electronics",
    store: "Sharaf DG",
    location: [23.5920, 58.4030] as [number, number],
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665",
    price: 999.990,
    originalPrice: 1299.990,
  },
  {
    id: "7",
    title: "Adidas Ultra Boost",
    description: "Premium running shoes with Boost technology",
    category: "Fashion",
    store: "Namshi",
    location: [23.5890, 58.4070] as [number, number],
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
    price: 79.990,
    originalPrice: 119.990,
  },
  {
    id: "8",
    title: "Samsung Galaxy S24 Ultra",
    description: "Latest Galaxy with AI features and 200MP camera",
    category: "Electronics",
    store: "Lulu",
    location: [23.5870, 58.4020] as [number, number],
    image: "https://images.samsung.com/levant/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-gray-mo.jpg",
    price: 449.990,
    originalPrice: 549.990,
  },
  {
    id: "9",
    title: "Weekly Grocery Bundle",
    description: "Essential groceries with fresh produce and meat",
    category: "Groceries",
    store: "Carrefour",
    location: [23.5910, 58.4040] as [number, number],
    image: "https://www.carrefouruae.com/cdn-cgi/image/width=1920,fit=contain,format=auto/mena/assets/images/Grocery-1920x450-EN.jpg",
    price: 49.990,
    originalPrice: 79.990,
  },
  {
    id: "10",
    title: "Xbox Series X Bundle",
    description: "Console with extra controller and Game Pass",
    category: "Gaming",
    store: "Amazon UAE",
    location: [23.5840, 58.4080] as [number, number],
    image: "https://m.media-amazon.com/images/I/61-jjE67uqL._AC_SX679_.jpg",
    price: 379.990,
    originalPrice: 479.990,
  },
  {
    id: "11",
    title: "iPad Pro 12.9\"",
    description: "M2 chip, 256GB with Apple Pencil",
    category: "Electronics",
    store: "Sharaf DG",
    location: [23.5925, 58.4035] as [number, number],
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=940&hei=1112&fmt=png-alpha",
    price: 449.990,
    originalPrice: 549.990,
  },
  {
    id: "12",
    title: "Zara Premium Collection",
    description: "Exclusive fashion collection for men and women",
    category: "Fashion",
    store: "Namshi",
    location: [23.5935, 58.4085] as [number, number],
    image: "https://static.zara.net/photos///contents/mkt/spots/aw23-north-woman-new/subhome-xmedia-38-3//w/1920/IMAGE-landscape-default-fill-8d14c0d9-9554-4149-8299-5f4d3fe2369c-default_0.jpg?ts=1695636129661",
    price: 89.990,
    originalPrice: 149.990,
  }
];

export default function HomePage() {
  return (
    <>
      <Header />
      <MainContent deals={MOCK_DEALS} />
      <Footer />
    </>
  )
}
