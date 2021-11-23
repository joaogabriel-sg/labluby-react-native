import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import { GoalInput } from "./src/components/GoalInput";
import { GoalItem } from "./src/components/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMore, setIsAddMore] = useState(false);

  const addGoalHandler = (goalTitle) => {
    if (goalTitle.trim().length === 0) return;

    setCourseGoals((prevCourseGoals) => [
      { id: String(new Date().getTime()), value: goalTitle },
      ...prevCourseGoals,
    ]);
    setIsAddMore(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((prevCourseGoals) =>
      prevCourseGoals.filter((prevCourseGoal) => prevCourseGoal.id !== goalId)
    );
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMore(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMore(true)} />
      <GoalInput
        visible={isAddMore}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        data={courseGoals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalItem
            id={item.id}
            title={item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
