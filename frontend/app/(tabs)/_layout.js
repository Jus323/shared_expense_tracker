const { Tabs } = require("expo-router")

const TabLayout =() => {
    return (
        <Tabs>
            <Tabs.Screen name = "Overview"/>
            <Tabs.Screen name = "Expenses"/>
            <Tabs.Screen name = "Change History"/>
        </Tabs>
    )
}

export default TabLayout;