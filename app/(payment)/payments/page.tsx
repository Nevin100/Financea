import PaymentCard from "@/components/payments/payment_card";
import stripeLogo from "@/assets/logos/stripe.png";
import paypalLogo from "@/assets/logos/paypal.png";
import razorpayLogo from "@/assets/logos/razorpay.png";
import { StaticImageData } from "next/image";

export interface PaymentLogoPropType {
  logo: StaticImageData;
  platformName: string;
  imgWidth: number;
}


export default function PaymentPage() {
  const paymentCardData: PaymentLogoPropType[] = [
    {
      logo: stripeLogo,
      platformName: "Stripe",
      imgWidth: 70
    },
    {
      logo: paypalLogo,
      platformName: "Paypal",
      imgWidth: 100
    },
    {
      logo: razorpayLogo,
      platformName: "Razorpay",
      imgWidth: 120
    },
  ]
  return (
    <div className="flex justify-center min-[1050px]:block">
      <div className="min-[1050px]:inline-grid min-[1050px]:w-max grid grid-cols-1 min-[1050px]:grid-cols-2 gap-y-[23px] sm:gap-[23px]">
        {
          paymentCardData.map((eachDetail, index) => {
            const { logo, platformName, imgWidth } = eachDetail;
            return (
              <PaymentCard key={index} logo={logo} platformName={platformName} imgWidth={imgWidth} />
            )
          })
        }
      </div>
    </div>

  );
}
