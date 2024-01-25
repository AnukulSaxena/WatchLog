import React from 'react'

function SubDetail({ detailInfo, detailKey, className }) {
    return (
        <div className={` lg: text-xl ${className}`}>
            <span className=" dark:text-white">
                {`${detailKey} : `}
            </span>
            <span className="dark:text-white opacity-50">
                {detailInfo}
            </span>
        </div>


    )
}

export default SubDetail