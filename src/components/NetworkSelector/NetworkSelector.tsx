import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./NetworkSelector.module.scss";
import Image from "next/image";
import icons from "~/assets/icons";
import { Network } from "~/constants/networks";

const cx = classNames.bind(styles);

type Props = {
    networks: Network[];
    className?: string;
};

const NetworkSelector = function ({ networks, className }: Props) {
    const [currentNetwork, setCurrentNetwork] = useState<string>(networks[0].name);
    const [isShownNetworks, setIsShowNetworks] = useState<boolean>(false);

    const handleShowNetworks = function () {
        setIsShowNetworks((prev) => !prev);
    };

    const handleChooseNetwork = function (network: string) {
        setCurrentNetwork(network);
    };
    return (
        <div className={cx("wrapper")}>
            <div
                className={cx(
                    "network-selector",
                    {
                        active: isShownNetworks,
                    },
                    className,
                )}
                onClick={handleShowNetworks}
            >
                <span className={cx("current-network")}>{currentNetwork}</span>
                <span className={cx("arrow-icon")}>
                    <Image src={icons.networkSelector} alt="arrow" />
                </span>
                <div
                    className={cx("cover_list-wrapper", {
                        show: isShownNetworks,
                    })}
                >
                    <ul className={cx("cover_list")}>
                        {networks.map(({ id, name }) =>
                            currentNetwork === name ? null : (
                                <li key={id} className={cx("network")} onClick={() => handleChooseNetwork(name)}>
                                    {name}
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NetworkSelector;
