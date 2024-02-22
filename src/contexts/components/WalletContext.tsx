"use client";

import React, { createContext } from "react";
import { WalletContextType } from "~/types/contexts/WalletContextType";

const WalletContext = createContext<WalletContextType>(null!);

export default WalletContext;
