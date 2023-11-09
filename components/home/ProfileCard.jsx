import { TouchableOpacity, Image, Text, View } from 'react-native';
import styles from './profileCard.style';
import { Link, useRouter } from 'expo-router';

export default function ProfileCard({ iconUrl, name }) {
    const router = useRouter();

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/* TODOS: Put the replace propertie */}
            <Link href='/menu' asChild>
                <TouchableOpacity onPress={() => {}}>
                    <Image source={iconUrl} style={styles.icon} resizeMode='contain'/>
                </TouchableOpacity>
            </Link>
            <Text style={styles.label}>{name}</Text>
        </View>
    );
}