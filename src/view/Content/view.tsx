import { ScrollView, View } from 'react-native'

import { ActivityIndicator } from '@components/atoms/ActivityIndicator'
import { Text } from '@components/atoms/Text'
import { ContentLayout } from '@components/organisms/ContentLayout'
import { HeaderOptions } from '@utils/HeaderOptions'

import { useContentViewModel } from './view-model'

const ContentView: React.FC = () => {
    const {
        content,
        loading,
        comments,
        onPressVote,
        onPressComment,
        onPressAnswer,
        onPressVoteComment,
    } = useContentViewModel()

    if (!content && loading) return <ActivityIndicator />

    if (!content) return <Text>No result</Text>

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <HeaderOptions title={content.title || 'Resposta'} />

            <View>
                <ContentLayout
                    main
                    onPressAnswer={onPressAnswer}
                    onPressVote={onPressVote}
                    content={content}
                />

                <View>
                    {comments.map((comment) => (
                        <ContentLayout
                            key={comment.id}
                            content={comment}
                            onPressVote={onPressVoteComment}
                            onPress={onPressComment}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default ContentView
