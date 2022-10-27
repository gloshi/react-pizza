import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
       
    >
        <circle cx="125" cy="125" r="125" />
        <rect x="0" y="288" rx="10" ry="10" width="280" height="32" />
        <rect x="0" y="341" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="445" rx="5" ry="5" width="95" height="30" />
        <rect x="122" y="444" rx="30" ry="30" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton

