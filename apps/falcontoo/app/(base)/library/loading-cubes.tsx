// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const COLORS = [
//   "#FF0000",
//   "#00FF00",
//   "#0000FF",
//   "#FFFF00",
//   "#FF8C00",
//   "#FFFFFF",
// ];
// const CUBE_SIZE = 3;

// const RubiksCube = () => {
//   const [cube, setCube] = useState(
//     Array(6)
//       .fill()
//       .map(() =>
//         Array(9)
//           .fill(0)
//           .map((_, i) => i),
//       ),
//   );

//   const scramble = () => {
//     const newCube = [...cube];
//     for (let i = 0; i < 20; i++) {
//       const face = Math.floor(Math.random() * 6);
//       rotateFace(newCube, face);
//     }
//     setCube(newCube);
//   };

//   const rotateFace = (cubeState, face) => {
//     const newFace = [
//       cubeState[face][6],
//       cubeState[face][3],
//       cubeState[face][0],
//       cubeState[face][7],
//       cubeState[face][4],
//       cubeState[face][1],
//       cubeState[face][8],
//       cubeState[face][5],
//       cubeState[face][2],
//     ];
//     cubeState[face] = newFace;
//   };

//   const solve = () => {
//     setCube(
//       Array(6)
//         .fill()
//         .map(() =>
//           Array(9)
//             .fill(0)
//             .map((_, i) => i),
//         ),
//     );
//   };

//   useEffect(() => {
//     scramble();
//     const interval = setInterval(() => {
//       setCube((prevCube) => {
//         if (prevCube.every((face) => face.every((cell, i) => cell === i))) {
//           clearInterval(interval);
//           return prevCube;
//         }
//         const newCube = [...prevCube];
//         rotateFace(newCube, Math.floor(Math.random() * 6));
//         return newCube;
//       });
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-900">
//       <div className="grid grid-cols-4 gap-2">
//         {[...Array(4)].map((_, row) => (
//           <React.Fragment key={row}>
//             {[...Array(3)].map((_, col) => {
//               const faceIndex =
//                 row === 1 ? col : row === 0 ? 4 : row === 2 ? 5 : 2;
//               return faceIndex !== undefined ? (
//                 <div key={`${row}-${col}`} className="grid grid-cols-3 gap-1">
//                   {cube[faceIndex].map((colorIndex, i) => (
//                     <motion.div
//                       key={i}
//                       className="h-8 w-8 rounded-sm"
//                       style={{ backgroundColor: COLORS[colorIndex] }}
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div key={`${row}-${col}`} />
//               );
//             })}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RubiksCube;
