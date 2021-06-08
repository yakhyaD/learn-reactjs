import React from 'react'

export const Preloader = () => {
    return (
        <div>
            <div className="preloader-wrapper center-align big active">
                <div className="spinner-layer spinner-gray-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
                </div>
            </div>
        </div>
    )
}
