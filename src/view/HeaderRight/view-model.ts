import { ViewModelHook } from '@common/interfaces/app'
import { useLoggedUser } from '@contexts/user/userContext'
import { User } from '@models/user'
import { logUserOutUseCase } from '@useCases/sessions/logUserOut'

import { useHeaderRightRouter } from './view-router'

export interface HeaderRightViewModelReturn {
    loggedUser: User | null
    onPressButtonLoggedIn(): void
    onPressButtonLoggedOut(): void
}

export const useHeaderRightViewModel: ViewModelHook<HeaderRightViewModelReturn> = () => {
    const loggedUser = useLoggedUser()

    const { goToLogin } = useHeaderRightRouter()

    function onPressButtonLoggedIn() {
        goToLogin()
    }
    function onPressButtonLoggedOut() {
        logUserOutUseCase()
        goToLogin()
    }

    return {
        loggedUser,
        onPressButtonLoggedIn,
        onPressButtonLoggedOut,
    }
}