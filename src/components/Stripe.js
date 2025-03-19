import React, { useContext } from "react";
import customerContext from "../CustomerContext";
// import Stripe from "stripe";
import {loadStripe} from '@stripe/stripe-js'

export default async function Stripe(props) {
//   const { stripeSessionInfo } = useContext(customerContext);
  const context = useContext(customerContext)
  let stripeSessionInfo = context.getStripe()
  console.log (stripeSessionInfo)
  //   console.log("checkout", stripeSessionInfo);
  let sessionIdObj = { sessionId: stripeSessionInfo.sessionId };
  let publishableKey = stripeSessionInfo.publishableKey;
  const stripePromise = loadStripe(publishableKey);
  const stripe = await stripePromise;
  stripe.redirectToCheckout(sessionIdObj);
}