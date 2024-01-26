import React from 'react';
import Image from "next/image"
import Emailverif1 from "../../public/email-verification/email-verif1.svg";
import Emailverif2 from "../../public/email-verification/email-verif2.svg";
import Emailverif3 from "../../public/email-verification/email-verif3.svg";
import Emailverif4 from "../../public/email-verification/email-verif4.svg";
import Emailverif5 from "../../public/email-verification/email-verif5.svg";


const EmailVerificationImage = () => {
    return (
        <div className="relative my-[80px]">
            <Image src={Emailverif1} alt="" className="z-50" />
            <Image src={Emailverif2} alt="" className="absolute top-[-30px] right-[-50px]" />
            <Image src={Emailverif3} alt="" className="z-[-999] absolute bottom-[-17px] left-[-87px]" />
            <Image src={Emailverif4} alt="" className="z-[-999] absolute bottom-[30px] right-[-90px]" />
            <Image src={Emailverif5} alt="" className="absolute top-[-50px] left-[-55px]" />
        </div>
    )
}

export default EmailVerificationImage