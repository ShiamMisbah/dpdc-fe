import { useMutation } from "@tanstack/react-query"
import { AddUtilityPayload } from "./types"
import { addUtility } from "./api"

export const useAddUtility = () => {
    return useMutation({
        mutationFn: (payload: AddUtilityPayload) => addUtility(payload)
    })
};