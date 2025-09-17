
"use client";

import 'react-phone-number-input/style.css'
import PhoneInputComponent, { type Props } from 'react-phone-number-input'
import { cn } from "@/lib/utils"

export function PhoneInput(props: Props<any>) {
    return (
        <div className="flex h-10 w-full rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <PhoneInputComponent
                {...props}
            />
        </div>
    );
}

