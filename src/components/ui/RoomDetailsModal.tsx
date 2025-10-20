// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Box,
//   Typography,
//   Button,
//   Divider,
//   Stack,
//   TextField,
// } from "@mui/material";
// import { CircleCheckBig } from "lucide-react";

// export interface Room {
//   id?: string;
//   title: string;
//   image: string;
//   price: string;
//   duration: string;
//   content: string;
//   serviceList: string[];
// }

// interface RoomDetailsModalProps {
//   open: boolean;
//   onClose: () => void;
//   room: Room | null;
//   isAdmin?: boolean; // if true, allows editing
//   onSave?: (updatedRoom: Room) => void; // callback to send updated data to backend
// }

// const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
//   open,
//   onClose,
//   room,
//   isAdmin = false,
//   onSave,
// }) => {
//   const [editableRoom, setEditableRoom] = useState<Room | null>(room);

//   useEffect(() => {
//     setEditableRoom(room);
//   }, [room]);

//   if (!editableRoom) return null;

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setEditableRoom((prev) => (prev ? { ...prev, [name]: value } : prev));
//   };

//   const handleSave = () => {
//     if (onSave && editableRoom) onSave(editableRoom);
//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="md"
//       PaperProps={{
//         sx: {
//           bgcolor: "#FFF",
//           overflow: "hidden",
//           boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
//           p: 0,
//           m: 0,
//         },
//       }}
//     >
//       <DialogContent sx={{ p: 0 }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             minHeight: { xs: "auto", md: 550 },
//           }}
//         >
//           {/* Left - Image */}
//           <Box
//             sx={{
//               width: { xs: "100%", md: "50%" },
//               height: "100%",
//               position: "relative",
//             }}
//           >
//             <Box
//               component="img"
//               src={editableRoom.image}
//               alt={editableRoom.title}
//               sx={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 filter: "brightness(0.9)",
//               }}
//             />
//             <Box
//               sx={{
//                 position: "absolute",
//                 bottom: 16,
//                 left: 16,
//                 bgcolor: "rgba(255,255,255,0.8)",
//                 px: 2,
//                 py: 0.5,
//                 borderRadius: 1,
//               }}
//             >
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: "#7B2E2E",
//                   fontWeight: 600,
//                   letterSpacing: 0.5,
//                 }}
//               >
//                 {editableRoom.duration.toUpperCase()}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Right - Details */}
//           <Box
//             sx={{
//               flex: 1,
//               py: 2,
//               px: 2,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               bgcolor: "#FDF9F6",
//             }}
//           >
//             <Box>
//               <DialogTitle
//                 sx={{
//                   fontFamily: "Poppins, sans-serif",
//                   fontWeight: 700,
//                   color: "#7B2E2E",
//                   fontSize: "1.9rem",
//                   mb: 1,
//                   px: 0,
//                 }}
//               >
//                 {isAdmin ? (
//                   <TextField
//                     fullWidth
//                     variant="standard"
//                     name="title"
//                     value={editableRoom.title}
//                     onChange={handleChange}
//                     sx={{ input: { color: "#7B2E2E", fontWeight: 700 } }}
//                   />
//                 ) : (
//                   editableRoom.title
//                 )}
//               </DialogTitle>

//               {isAdmin ? (
//                 <TextField
//                   multiline
//                   fullWidth
//                   rows={4}
//                   name="content"
//                   value={editableRoom.content}
//                   onChange={handleChange}
//                   sx={{
//                     mb: 3,
//                     fontFamily: "Inter, sans-serif",
//                   }}
//                 />
//               ) : (
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     mb: 3,
//                     fontFamily: "Inter, sans-serif",
//                     color: "#3D444B",
//                     lineHeight: 1.6,
//                   }}
//                 >
//                   {editableRoom.content}
//                 </Typography>
//               )}

//               <Divider sx={{ mb: 2, borderColor: "rgba(123,46,46,0.2)" }} />

//               <Typography
//                 variant="h6"
//                 sx={{
//                   color: "#7B2E2E",
//                   fontWeight: 700,
//                   mb: 1.5,
//                 }}
//               >
//                 Amenities
//               </Typography>

//               <Stack spacing={1.2}>
//                 {editableRoom.serviceList.map((service, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                     }}
//                   >
//                     <CircleCheckBig size={18} color="#D4A373" />
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontFamily: "Inter, sans-serif",
//                         color: "#3D444B",
//                       }}
//                     >
//                       {service}
//                     </Typography>
//                   </Box>
//                 ))}

//                 <Box>
//                   {isAdmin ? (
//                     <TextField
//                       name="price"
//                       variant="standard"
//                       value={editableRoom.price}
//                       onChange={handleChange}
//                       sx={{ width: "30%", input: { color: "#7B2E2E" } }}
//                     />
//                   ) : (
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         color: "#7B2E2E",
//                         fontWeight: 700,
//                       }}
//                     >
//                       {editableRoom.price}
//                     </Typography>
//                   )}
//                   <Box
//                     sx={{
//                       display: "grid",
//                       placeItems: "center",
//                     }}
//                   >
//                     <Button
//                       onClick={isAdmin ? handleSave : onClose}
//                       sx={{
//                         bgcolor: "primary.contrastText",
//                         color: "#7B2E2E",
//                         borderRadius: 0.5,
//                         py: "10px",
//                         px: "15px",
//                         width: 300,
//                         fontWeight: 600,
//                         border: "1px solid #7B2E2E",
//                         boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
//                         transition: "all 0.3s",
//                         "&:hover": { bgcolor: "#7B2E2E", color: "#fff" },
//                       }}
//                     >
//                       {isAdmin ? "Save Changes" : "Contact for Booking"}
//                     </Button>
//                   </Box>
//                 </Box>
//               </Stack>
//             </Box>
//           </Box>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RoomDetailsModal;
