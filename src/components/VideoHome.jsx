import { useEffect, useRef } from "react";


export function VideoHome({ video }) {

    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {

                        videoRef.current.play();
                    } else {

                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                });
            },
            { threshold: 0.6 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    return (

        <section className="videoSection">

            

            <video
                ref={videoRef}
                className="videoPlayer"
                loop
                onClick={(e) => e.target.paused ? e.target.play() : e.target.pause()}
                src={video.url}
            />

            <div className="videoOverlay-info">
                <h3 className="font-bold text-lg">@{video.user}</h3>
                <p className="text-sm my-2">{video.description}</p>
                <div className="flex items-center gap-2 text-xs opacity-80 italic">
                    <span className="text-lg">🎵</span>
                    <p>{video.song}</p>
                </div>
            </div>

            <div className="videoOverlay-actions">
                <div className="flex flex-col items-center gap-4">
                    <button className="actionBtn hover:bg-red-500">
                        <svg width="24" data-e2e="" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#HeartFill_clip0)"><g filter="url(#HeartFill_filter0_d)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 2.25C10.5 2.25 12 4.25 12 4.25C12 4.25 13.5 2.25 16.5 2.25C20 2.25 22.5 4.99999 22.5 8.5C22.5 12.5 19.2311 16.0657 16.25 18.75C14.4095 20.4072 13 21.5 12 21.5C11 21.5 9.55051 20.3989 7.75 18.75C4.81949 16.0662 1.5 12.5 1.5 8.5C1.5 4.99999 4 2.25 7.5 2.25Z"></path></g><path fill-rule="evenodd" clip-rule="evenodd" d="M2.40179 12.1998C3.58902 14.6966 5.7592 16.9269 7.74989 18.75C9.5504 20.3989 10.9999 21.5 11.9999 21.5C12.9999 21.5 14.4094 20.4072 16.2499 18.75C19.231 16.0657 22.4999 12.5 22.4999 8.49997C22.4999 8.41258 22.4983 8.32566 22.4952 8.23923C20.5671 13.6619 13.6787 18.5 11.75 18.5C10.3127 18.5 5.61087 15.8131 2.40179 12.1998Z" fill-opacity="0.03"></path></g><defs><filter id="HeartFill_filter0_d" x="-0.9" y="1.05" width="25.8" height="24.05" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1.2"></feOffset><feGaussianBlur stdDeviation="1.2"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><clipPath id="HeartFill_clip0"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                    </button>
                    <button className="actionBtn hover:bg-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M2 21.5c0-10.22 9.88-18 22-18s22 7.78 22 18c0 5.63-3.19 10.74-7.32 14.8a43.6 43.6 0 0 1-14.14 9.1A1.5 1.5 0 0 1 22.5 44v-5.04C11.13 38.4 2 31.34 2 21.5M14 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6m10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6m13-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
            
        </section>

    )

}