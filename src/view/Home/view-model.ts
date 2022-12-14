import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'

import { ViewModelHook } from '@common/interfaces/app'
import { Post } from '@models/post'
import { listContentsUseCase } from '@useCases/content/listContents'

import { useHomeRouter } from './view-router'

export interface HomeViewModelReturn {
    loading: boolean
    error?: Error
    contents?: Post[][]
    loadNextPage(): void
    handleContentPress(content: Post): void
}

export const useHomeViewModel: ViewModelHook<HomeViewModelReturn> = () => {
    const { listContentStrategy, openContent } = useHomeRouter()

    const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null

        return [index + 1, 30, listContentStrategy]
    }

    const {
        data,
        isValidating,
        error,
        setSize: setPage,
        size: page,
    } = useSWRInfinite<Post[], Error>(getKey, listContentsUseCase)

    function loadNextPage() {
        if (isValidating) return

        const nextPage = page + 1

        setPage(nextPage)
    }

    function handleContentPress(content: Post) {
        openContent(content.owner_username, content.slug)
    }

    return {
        loading: isValidating,
        error,
        contents: data,
        loadNextPage,
        handleContentPress,
    }
}
