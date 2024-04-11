import React, { MutableRefObject, useMemo, useRef } from "react";
import { Text, View } from "@/components/Global/Themed";
import BottomSheet from "@gorhom/bottom-sheet";

interface Props {
  postId: string;
  ref: MutableRefObject<BottomSheet | null>;
}

export const Comments: React.FC<Props> = ({ postId, ref }) => {
  const snapPoints = useMemo(() => ["0%", "75%", "90%"], []);

  return (
    <BottomSheet ref={ref} index={1} snapPoints={snapPoints}>
      <View>
        <Text>{postId}</Text>
      </View>
    </BottomSheet>
  );
};
