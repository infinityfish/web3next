import React from 'react'
import { useForm } from "react-hook-form";
import { Moralis } from 'moralis'
import { useMoralis } from "react-moralis";


function Upload() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { authenticate, isAuthenticated, logout, user, chainId } = useMoralis();

    React.useEffect(() => {
        if (!isAuthenticated){
            authenticate()
        }
    }, [ authenticate, isAuthenticated]);
// const onSubmit = data => console.log(data.image[0].name);

    async function onSubmit(data) {

        //save data/image on IPFS
        const imageFile = new Moralis.File(data.image[0].name, data.image[0])
        await imageFile.saveIPFS();
        let imageHash = imageFile.hash();

        let metadata = {
            name: data.name,
            description: data.description,
            image: "/ipfs/" + imageHash
        }

        console.log("metadata is ", metadata)
        const jsonFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
        await jsonFile.saveIPFS();

        let metadataHash = jsonFile.hash();
        console.log(jsonFile.ipfs())  

        //mint nft on rarible: 
        // install plugin on moralis dashboard before coninuing
        // need to be authenicated before proceeding. see useEffect above
        if (!user){
            await authenticate()
        }
        
        let res = await Moralis.Plugins.rarible.lazyMint({
            chain: 'rinkeby',
            userAddress: user.get('ethAddress'),
            tokenType: 'ERC721',
            tokenUri: 'ipfs://' + metadataHash,
            royaltiesAmount: 5, // 0.05% royalty. Optional
        })

        console.log(res);
        const nftLocation = `https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}`
        console.log(" Here is your NFT", nftLocation)


    };


    return (
        <div className="main">
            <div className="formContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">NFT Name</label>
                    <input {...register("name", { required: true, maxLength: 65, minLength: 4 })} type="text"   placeholder="NFT name " className="formInput"/>
                    <p className="formError">{errors.name && <span>Name is required</span>}</p>

                    <label htmlFor="description">NFT Description</label>
                    <input {...register("description", { required: true, maxLength: 65, minLength: 4 })} type="text"   placeholder="NFT description " className="formInput"/>
                    <p className="formError">{errors.name && <span>Description is required</span>}</p>


                    <input {...register('image', { required: true })} type="file" accept="image/png, image/jpeg, image/jpg, image/webp" />
                    <p className="formError">{errors.name && <span>Image is required</span>}</p>

                    <button type="submit" className="btn-primary">Upload to IPFS</button>
        
                </form>
                
            </div>
        </div>

    )
}

export default Upload
