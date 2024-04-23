"use client";

import classNames from "classnames/bind";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./DelegationRewards.module.scss";
import Tippy from "~/components/Tippy";
import Image from "next/image";
import icons from "~/assets/icons";
import Table from "~/components/Table";
import Pagination from "~/components/Pagination";
import { historyRewards } from "~/constants/header-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DelegationRewardType } from "~/types/GenericsType";
import Loading from "~/components/Loading";
import { useDebounce } from "~/hooks";
const cx = classNames.bind(styles);

const DelegationRewards = function () {
    const [page, setPage] = useState<number>(1);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const debouncedValue = useDebounce(walletAddress);

    const {
        data: rewards,
        isSuccess,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["Rewards", debouncedValue, page],
        queryFn: () =>
            axios.get<DelegationRewardType[]>(`http://localhost:3000/history/reward?wallet_address=${debouncedValue}&page=${page}&page_size=5`),
        enabled: !!debouncedValue,
    });

    const handleChangeWalletAddress = function (e: React.ChangeEvent<HTMLInputElement>) {
        setWalletAddress(e.target.value);
    };

    const handleClearInput = function () {
        setWalletAddress("");
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <h1 className={cx("title")}>Delegation Rewards for ADA holders</h1>
                <h2 className={cx("sub-title")}>Check your ADA rewards</h2>
                <form className={cx("form")}>
                    <section className={cx("label")}>
                        <div className={cx("input-name")}>Address</div>
                        <Tippy render={<div>Please enter your Cardano address eligible for deligation rewards.</div>}>
                            <Image className={cx("icon-help-circle")} src={icons.helpCircle} width={12} height={12} alt="" />
                        </Tippy>
                    </section>
                    <section className={cx("search")}>
                        <div className={cx("search-input")}>
                            <input
                                value={walletAddress}
                                onChange={handleChangeWalletAddress}
                                type="text"
                                placeholder="Enter address to load the data"
                            />
                        </div>
                        <div
                            className={cx("search-delete", {
                                show: !!walletAddress,
                            })}
                            onClick={handleClearInput}
                        />
                    </section>
                </form>

                <section className={cx("summary")}>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>Current Epoch</h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <>
                                    {isSuccess && rewards.data.length > 0 ? (
                                        <Link className={cx("summary-link")} href={""} target="_blank">
                                            468
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </>
                            )}
                        </p>
                    </div>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>Total Distributed Rewards</h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <>
                                    {isSuccess && rewards.data.length > 0 ? (
                                        <Link className={cx("summary-link")} href={""} target="_blank">
                                            468
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </>
                            )}
                        </p>
                    </div>
                    <div className={cx("summary-item")}>
                        <h2 className={cx("summary-title")}>Total Pending Rewards</h2>
                        <p className={cx("summary-description")}>
                            {isLoading ? (
                                <Loading className={cx("small-loading")} />
                            ) : (
                                <>
                                    {isSuccess && rewards.data.length > 0 ? (
                                        <Link className={cx("summary-link")} href={""} target="_blank">
                                            468
                                        </Link>
                                    ) : (
                                        <span className={cx("no-data-hyphen")}>-</span>
                                    )}
                                </>
                            )}
                        </p>
                    </div>
                </section>

                {isLoading ? (
                    <div className={cx("loading-wrapper")}>
                        <Loading className={cx("loading")} />
                    </div>
                ) : (
                    <div>
                        {isSuccess && (
                            <div>
                                {rewards.data.length === 0 ? (
                                    <section className={cx("status")}>
                                        <div className={cx("no-data")} />
                                        <span>No data for this wallet address</span>
                                    </section>
                                ) : (
                                    <div>
                                        <Table center titles={historyRewards} data={rewards?.data} />
                                        <Pagination totalPages={5} page={1} setPage={setPage} totalItems={20} />
                                    </div>
                                )}
                            </div>
                        )}

                        {!rewards && (
                            <section className={cx("status")}>
                                <div className={cx("no-data")} />
                                <span>No available data</span>
                            </section>
                        )}

                        {isError && (
                            <section className={cx("status")}>
                                <div className={cx("no-data")} />
                                <span>Error to fetch data</span>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DelegationRewards;
