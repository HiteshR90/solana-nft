import { WalletError } from "@solana/wallet-adapter-base";
import React, { Component } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "HiteshRUmaletiy";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

//ts-node ~/deprecated-clis/src/candy-machine-v2-cli.ts --version

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  walletAddress : null,
		  campaigns: []
		}
	  }

	checkIfWalletIsConnected = async() => {
		try{
		  const {solana} = window;
		  if(solana) {
			if(solana.isPhantom) {
			  console.log('Phantom wallet found');
			  const response = await solana.connect({onlyIfTrusted: true});
			  console.log('Connected with public key', response.publicKey.toString());
			  this.setState({walletAddress: response.publicKey.toString()})
			}
		  } else {
			alert('Solana object not found. Get Phantom Wallet');
		  }
		} catch(err) {
		  console.error(err);
		}
	  }
	
	connectWallet = async()=>{
		const {solana} = window;
		if(solana) {
		  const response = await solana.connect();
		  console.log('Connect with public key:', response.publicKey.toString());
		  this.setState({walletAddress: response.publicKey.toString()})
		}
	  }

	  renderNotConnectedContainer = () => {
		return <button className="cta-button connect-wallet-button" onClick={this.connectWallet}>Connect to wallet</button>
	  }

	  componentDidMount = async() => {
		await this.checkIfWalletIsConnected();
	  }

	render() {
		return (
			<div className="App">
				<div className="container">
					<div className="header-container">
						<p className="header">🍭 Candy Drop</p>
						<p className="sub-text">NFT drop machine with fair mint</p>
						{!this.state.walletAddress && this.renderNotConnectedContainer()}
					</div>
					{this.state.walletAddress && (
						<CandyMachine walletAddress={window.solana} />
					)} 
					<div className="footer-container">
						<img
							alt="Twitter Logo"
							className="twitter-logo"
							src={twitterLogo}
						/>
						<a
							className="footer-text"
							href={TWITTER_LINK}
							target="_blank"
							rel="noreferrer"
						>{`Adapted from @${TWITTER_HANDLE}`}</a>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
