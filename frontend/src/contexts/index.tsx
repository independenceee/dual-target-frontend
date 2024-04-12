"use client";

import React, { ReactNode, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SmartContractProvider = lazy(() => import("~/contexts/providers/SmartContractProvider"));
const WalletProvider = lazy(() => import("~/contexts/providers/WalletProvider"));
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("~/contexts/providers/ModalProvider"));
const ToastProvider = lazy(() => import("~/contexts/providers/ToastProvider"));
const AccountProvider = lazy(() => import("~/contexts/providers/AccountProvider"));
const NetworkProvider = lazy(() => import("~/contexts/providers/NetworkProvider"));
const TranslateProvider = lazy(() => import("~/contexts/providers/TranslateProvider"));

type Props = {
    children: ReactNode;
};

const queryClient = new QueryClient();

const ContextProvider = function ({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <TranslateProvider>
                <ToastProvider>
                    <ModalProvider>
                        <NetworkProvider>
                            <LucidProvider>
                                <WalletProvider>
                                    <AccountProvider>
                                        <SmartContractProvider>{children}</SmartContractProvider>
                                    </AccountProvider>
                                </WalletProvider>
                            </LucidProvider>
                        </NetworkProvider>
                    </ModalProvider>
                </ToastProvider>
            </TranslateProvider>
        </QueryClientProvider>
    );
};

export default ContextProvider;
