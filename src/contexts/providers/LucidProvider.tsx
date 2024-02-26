"use client";

import React, { ReactNode, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import LucidContext from "~/contexts/components/LucidContext";
import { Network } from "~/types/GenericsType";

type Props = {
    children: ReactNode;
};

const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>(null!);

    return <LucidContext.Provider value={{ lucid, setLucid }}>{children}</LucidContext.Provider>;
};

export default LucidProvider;