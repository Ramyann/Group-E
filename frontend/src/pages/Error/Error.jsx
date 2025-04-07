import { useRouteError } from "react-router-dom";

function Error() {

    const error = useRouteError()
    console.error(error)
    return (
        <div className="grid items-center justify-center h-svh w-svw" >
            <div
                className="p-12 flex flex-col items-center justify-center gap-y-6"
            >
                <p className="text-4xl">
                    {error.statusText || error.message}
                </p>
                <button type="button" className="px-4 py-3 text-xl border rounded-lg hover:bg-white hover:text-[#000000d6] hover:border-none transition-all font-medium hover:font-semibold">Back to Home</button>
            </div>
        </div>
    )
}

export default Error
