import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Header = () => {
  const [addr, setAddr] = useState();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const handleDisconnect = () => {
    disconnect();
  };

  useEffect(() => {
    if (isConnected || address) {
      setAddr(addr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);

  /* Functions */
  const handleMetamaskSignIn = () => {
    connect({ connector: connectors[0] });
  };
  return (
    <header id="header">
      {/* Navbar */}
      <nav
        data-aos="zoom-out"
        data-aos-delay={800}
        className="navbar navbar-expand"
      >
        <div className="container header">
          {/* Navbar Brand*/}
          <a className="navbar-brand" href="/">
            <img
              className="navbar-brand-sticky"
              src="img/logo.png"
              alt="sticky brand-logo"
            />
          </a>
          <div className="ml-auto" />
          {/* Navbar */}
          <ul className="navbar-nav items mx-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" href="/">
                Create
              </a>
            </li>
            <li className="nav-item">
              <a href="/activity" className="nav-link">
                Activity
              </a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
          {/* Navbar Action Button */}
          <ul className="navbar-nav action">
            <li className="nav-item ml-3">
              {isConnected ? (
                <div
                  className="btn ml-lg-auto btn-bordered-white"
                  onClick={handleDisconnect}
                >
                  <i className="icon-wallet mr-md-2" />
                  Disconnect
                </div>
              ) : (
                <div
                  className="btn ml-lg-auto btn-bordered-white"
                  onClick={handleMetamaskSignIn}
                >
                  <i className="icon-wallet mr-md-2" />
                  Wallet Connect
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
