// import { getAllBlogs } from "@/actions/blogs.action";
// import {
//   BlogClient,
//   BlogCreateClient,
// } from "@/components/admin/blogs/BlogClient";
// import { CalendarMonth } from "@mui/icons-material";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Chip,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import Image from "next/image";
// import React from "react";
// interface ChipItem {
//   label: string;
//   position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
// }

// async function page() {
//   const res = await getAllBlogs();
//   return (
//     <Box>
//       <Container sx={{ py: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h2" mb={4}>
//             Blogs
//           </Typography>
//           <BlogCreateClient />
//         </Box>
//         <Grid container spacing={3}>
//           {res?.data?.map((item, index) => {
//             const chips = item.chips as unknown as ChipItem[];

//             return (
//               <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     transition: "all 0.3s ease-in",
//                     backgroundColor: "rgba(217,212,209,0.25)",
//                     boxShadow:
//                       index === 1
//                         ? "0 20px 40px rgba(123,46,46,0.25)"
//                         : "0 8px 20px rgba(123,46,46,0.15)",
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     "&:hover": {
//                       transform: "translateY(-8px) scale(1.02)",
//                       boxShadow: "0 25px 50px rgba(123,46,46,0.3)",
//                     },
//                   }}
//                 >
//                   <Box sx={{ position: "relative" }}>
//                     <CardMedia
//                       component="div"
//                       sx={{
//                         width: "100%",
//                         height: 250,
//                         objectFit: "cover",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <Image
//                         src={item.image || "/place-holder.png"}
//                         alt={item.title}
//                         fill
//                         style={{
//                           objectFit: "cover",
//                           width: "100%",
//                           height: "100%",
//                         }}
//                         loading="lazy"
//                       />
//                     </CardMedia>

//                     {chips &&
//                       chips.map((chip, ci) => {
//                         if (!chip) return null;
//                         return (
//                           <Chip
//                             key={ci}
//                             label={chip.label}
//                             sx={{
//                               position: "absolute",
//                               ...(chip.position === "top-right" && {
//                                 top: 10,
//                                 right: 10,
//                               }),
//                               ...(chip.position === "top-left" && {
//                                 top: 10,
//                                 left: 10,
//                               }),
//                               ...(chip.position === "bottom-right" && {
//                                 bottom: 10,
//                                 right: 10,
//                               }),
//                               ...(chip.position === "bottom-left" && {
//                                 bottom: "70%",
//                                 left: 10,
//                               }),

//                               background:
//                                 chip.position === "top-right"
//                                   ? "rgba(123,46,46,0.6)"
//                                   : "rgba(255,255,255,0.65)",
//                               color:
//                                 chip.position === "top-right"
//                                   ? "white"
//                                   : "#7B2E2E",

//                               display: "flex",
//                               alignItems: "center",
//                               gap: 1.5,
//                               px: 2.5,
//                               py: 1.2,
//                               borderRadius: "10px",
//                               backdropFilter: "blur(8px)",
//                               fontWeight: 600,
//                               fontFamily: "Inter",
//                               fontSize: "0.9rem",
//                             }}
//                           />
//                         );
//                       })}
//                   </Box>

//                   <CardContent
//                     sx={{
//                       flex: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       p: 3,
//                     }}
//                   >
//                     {/* Date */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         mb: 2,
//                         color: "secondary.main",
//                       }}
//                     >
//                       <CalendarMonth sx={{ fontSize: 18 }} />
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           fontWeight: 600,
//                           fontSize: "0.875rem",
//                         }}
//                       >
//                         {item.date.toLocaleDateString()}
//                       </Typography>
//                     </Box>

//                     {/* Title */}
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         fontFamily: "Poppins, sans-serif",
//                         fontWeight: 700,
//                         color: "text.primary",
//                         mb: 2,
//                         lineHeight: 1.3,
//                       }}
//                     >
//                       {item.title}
//                     </Typography>

//                     {/* Content */}
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "text.secondary",
//                         lineHeight: 1.7,
//                         mb: 3,
//                         flex: 1,
//                       }}
//                     >
//                       {item.content}
//                     </Typography>
//                     <BlogClient blogs={[item]} />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// export default page;
import React from "react";

const page = () => {
  return <div></div>;
};

export default page;
