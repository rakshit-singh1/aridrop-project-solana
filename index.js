const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js')

const wallet =new Keypair()
console.log(wallet);

// const wallet = new Keypair({
//     _keypair: {
//         publicKey: new Uint8Array(32)[
//             130, 189, 43, 158, 112, 51, 55, 149,
//             208, 146, 18, 41, 4, 251, 242, 110,
//             9, 107, 127, 30, 210, 3, 93, 227,
//             28, 12, 174, 36, 21, 166, 244, 21
//         ],
//         secretKey: new Uint8Array(64)[
//             190, 89, 23, 1, 175, 97, 10, 107, 85, 55, 32,
//             186, 237, 94, 98, 196, 54, 55, 249, 20, 26, 229,
//             16, 120, 53, 123, 169, 131, 195, 178, 18, 187, 130,
//             189, 43, 158, 112, 51, 55, 149, 208, 146, 18, 41,
//             4, 251, 242, 110, 9, 107, 127, 30, 210, 3, 93,
//             227, 28, 12, 174, 36, 21, 166, 244, 21
//         ]
//     }
// })

// console.log(wallet);

const publicKey = new PublicKey(wallet._keypair.publicKey);
console.log(publicKey);
const privateKey = wallet._keypair.secretKey;
console.log(privateKey);

const getWalletBalance = async() => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log("Wallet Balance is: ",walletBalance);
    }catch(err){
        console.error(err)
    }
}

const airDropSol = async() => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed');
        const fromAIRDropSIgnature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAIRDropSIgnature);
    }catch(err){
        console.error(err)
    }
}

const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()