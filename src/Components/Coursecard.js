// import useEffect from 'react';

// function CourseCard({
//     courseName, courseThumbnail, courseDetails,
//     coursePrice, courseDiscountedPrice, courseDiscount,
// }){
//     useEffect(()=>{
//         const loadScript = ("https://checkout.razorpay.com/v1/checkout.js") => {
//             return new Promise((resolve) => {
//               const script = document.createElement("script");
//               script.src = src;
//               script.onload = () => {
//                 resolve(true);
//               };
//               script.onerror = () => {
//                 resolve(false);
//               };
//              document.body.appendChild(script);
//            });
//         };
//     })



// function display(){
   
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//     const options = {
//         key: "rzp_test_InP8ukbnWQ6ET8",
//         currency: 0,
//         amount: 0,
//         name: "Learning To Code Online",
//         description: "Test Wallet Transaction",
//         // image: "http://localhost:1337/logo.png",
//         order_id: 0,
//         handler: function (response) {
//           alert(response.razorpay_payment_id);
//           alert(response.razorpay_order_id);
//           alert(response.razorpay_signature);
//         },
//         prefill: {
//           name: "Anirudh Jwala",
//           email: "anirudh@gmail.com",
//           contact: "9999999999",
//         },
//       };
// }

//     return (
        
//       <article className="card">
//         <img src={courseThumbnail} alt={courseName} />
//         <div className="card-content">
//           <header className="card-header">
//             <h5>{courseName}</h5>
//           </header>
//           <p>{courseDetails}</p>
//           <h4>
//             ₹{courseDiscountedPrice}{" "}
//             <span className="course-price">₹{coursePrice}</span>{" "}
//             <span className="course-discount-percentage">
//               {courseDiscount}% OFF
//             </span>
//           </h4>
//           <p>hii</p>
//           <button
//         type="button"
//   onClick={display()}
//   className="course-payment-button">
//   Buy Now
// </button>
//         </div>
//       </article>
//     );
//   }
//   export default CourseCard;