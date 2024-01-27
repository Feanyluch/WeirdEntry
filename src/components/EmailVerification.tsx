import React from 'react';
import Image from "next/image"
import Emailverif1 from "../../public/email-verification/email-verif1.svg";
import Emailverif2 from "../../public/email-verification/email-verif2.svg";
import Emailverif3 from "../../public/email-verification/email-verif3.svg";
import Emailverif4 from "../../public/email-verification/email-verif4.svg";
import Emailverif5 from "../../public/email-verification/email-verif5.svg";


const EmailVerificationImage = () => {
    return (
        <div className="relative my-[40px]">
            <Image src={Emailverif1} alt="" className="z-50 w-[90px] h-[93px]" />
            <Image src={Emailverif2} alt="" className="absolute top-[-15px] right-[-25px] w-[25px] h-[25px]" />
            <Image src={Emailverif3} alt="" className="z-[-999] absolute bottom-[-10px] left-[-50px] w-[70px] h-[58px]" />
            <Image src={Emailverif4} alt="" className="z-[-999] absolute bottom-[12px] right-[-50px] w-[62px]" />
            <Image src={Emailverif5} alt="" className="absolute top-[-25px] left-[-30px] w-[48px] h-[48px]" />
        </div>
    )
}

export default EmailVerificationImage