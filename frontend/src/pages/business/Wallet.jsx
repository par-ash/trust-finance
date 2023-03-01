import React from "react";
import CoinbaseLogo from "assets/images/coinbase_logo.png";
import MetamaskLogo from "assets/images/metamask_logo.png";
import GnosisLogo from "assets/images/gnosisW_logo.png";
import PhantomLogo from "assets/images/phantom_logo.png";
import TransakLogo from "assets/images/transak.png";
import WalletConnectLogo from "assets/images/walletconnect_logo.png";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

export default function BusinessWallet() {
	const web3Modal = new Web3Modal({
		network: "mainnet",
		cacheProvider: true,
		providerOptions: {
			walletconnect: {
				package: WalletConnectProvider,
				options: {
					infuraId: "8c0b7dedc04f4035a217cc1dc82b5426",
				},
			},
		},
	});

	const [chainId, setChainId] = React.useState(1);
	const [address, setAddress] = React.useState("");
	const [isWalletConnect, setIsWalletConnect] = React.useState(false);
	const [provider, setProvider] = React.useState();

	function accountsChanged(accounts) {
		console.log("accountsChanged", accounts);
		setAddress(accounts[0]);
	}

	function chainChanged(chainId) {
		console.log("chainChanged", chainId);
		setChainId(chainId);
	}

	function reset() {
		console.log("reset");
		setAddress("");
		setProvider(undefined);
		web3Modal.clearCachedProvider();
	}

	async function connectWalletConnect() {
		// if (!process.env.REACT_APP_INFURA_ID) {
		//   throw new Error("Missing Infura Id");
		// }
		const web3Provider = await web3Modal.connect();

		web3Provider.on("accountsChanged", accountsChanged);
		web3Provider.on("chainChanged", chainChanged);
		web3Provider.on("disconnect", reset);

		const accounts = await web3Provider.enable();
		setAddress(accounts[0]);
		setChainId(web3Provider.chainId);

		const provider = new providers.Web3Provider(web3Provider);
		setProvider(provider);
		setIsWalletConnect(true);
	}

	return (
		<div className="container">
			<div className="pt-5 px-5 mt-5">
				<p className="h2">Connect Your Wallet</p>
				<p className="text-secondary mt-4">Select what network and wallet you want below</p>

				<div className="form-check my-5">
					<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
					<p>
            Accept <strong className="text-primary">Terms of Service</strong> and{" "}
						<strong className="text-primary">Privacy Policy</strong>
					</p>
				</div>

				<p className="fw-semibold">Transak</p>

				<div className="row mb-4">
					<div className="col-3">
						<div className="card rounded-5 h-100">
							<div className="card-body d-flex justify-content-center flex-column align-items-center">
								<div>
									<img src={TransakLogo} width={40} alt="transak logo" />
								</div>
								<p className="mb-0 pt-2">Transak</p>
							</div>
						</div>
					</div>
				</div>

				<p className="fw-semibold">Coinbase Wallet</p>

				<div className="row mb-4">
					<div className="col-3">
						<div className="card rounded-5 h-100">
							<div className="card-body d-flex justify-content-center flex-column align-items-center">
								<div>
									<img src={CoinbaseLogo} width={40} alt="coinbase logo" />
								</div>
								<p className="mb-0 pt-2">Coinbase Wallet</p>
							</div>
						</div>
					</div>
				</div>

				<p className="fw-semibold">Choose Wallet</p>

				<div className="row">
					<div className="col-3">
						<div className="card rounded-5 h-100">
							<div className="card-body d-flex justify-content-center flex-column align-items-center">
								<div>
									<img src={MetamaskLogo} width={40} alt="metamask logo" />
								</div>
								<p className="mb-0 pt-2">Metamask</p>
							</div>
						</div>
					</div>
					<div className="col-3">
						<div className="card rounded-5 h-100">
							<div className="card-body d-flex justify-content-center flex-column align-items-center">
								<div>
									<img src={PhantomLogo} width={40} alt="phantom logo" />
								</div>
								<p className="mb-0 pt-2">Phantom</p>
							</div>
						</div>
					</div>
					<div className="col-3">
						<div className="card rounded-5 h-100">
							<div className="card-body d-flex justify-content-center flex-column align-items-center">
								<div>
									<img src={GnosisLogo} width={40} alt="gnosis logo" />
								</div>
								<p className="mb-0 pt-2">Gnosis</p>
							</div>
						</div>
					</div>
					<div className="col-3">
						<div className="card rounded-5 h-100" onClick={connectWalletConnect}>
							<div className="card-body d-flex justify-content-center flex-column align-items-center">
								<div>
									<img src={WalletConnectLogo} width={40} alt="gnosis logo" />
								</div>
								<p className="mb-0 pt-2">Wallet Connect</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				{ isWalletConnect &&
					<div>
						WalletConnect Address: {address}
					</div>
				}
			</div>
		</div>
	);
}
