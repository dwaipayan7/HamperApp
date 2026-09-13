import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,

  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef, ScrollView } from "react-native-actions-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import SCText from "./CustomText";
import { COLORS } from "@/constants/colors";
import {
  useAICompose,
  AIAction,
  EnhanceSuggestion,
  CaptionSuggestion,
} from "@/services/AIService";
import { showMessage } from "@/utils/AllContext";

interface AIAssistantModalProps {
  show: boolean;
  onClose: () => void;
  currentContent: string;
  onApplyContent: (content: string) => void;
}

const TONES = [
  { id: "engaging", label: "Engaging", icon: "fire" },
  { id: "punchy", label: "Punchy", icon: "lightning-bolt" },
  { id: "casual", label: "Casual", icon: "coffee" },
  { id: "professional", label: "Professional", icon: "briefcase" },
  { id: "witty", label: "Witty", icon: "emoticon-happy-outline" },
];

const AIAssistantModal = ({
  show,
  onClose,
  currentContent,
  onApplyContent,
}: AIAssistantModalProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [activeTab, setActiveTab] = useState<AIAction>("enhance");
  const [selectedTone, setSelectedTone] = useState<string>("engaging");
  const [ideaTopic, setIdeaTopic] = useState<string>("");


  const [suggestions, setSuggestions] = useState<EnhanceSuggestion[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [captions, setCaptions] = useState<CaptionSuggestion[]>([]);

  const { mutateAsync: composeAI, isPending } = useAICompose();

  useEffect(() => {
    if (show) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [show]);

  const handleEnhance = async () => {
    if (!currentContent.trim()) {
      Alert.alert(
        "Draft is Empty",
        "Please type something in your post before enhancing.",
      );
      return;
    }

    try {
      const result = await composeAI({
        action: "enhance",
        content: currentContent,
        tone: selectedTone,
      });

      console.log("The Suggetions are: ", result);


      if (result.suggestions && result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
      } else {
        showMessage("No suggestions generated. Try again.", "error");
      }
    } catch (err: any) {
      showMessage(err.message || "Failed to enhance post", "error");
    }
  };

  const handleGenerateHashtags = async () => {
    if (!currentContent.trim()) {
      Alert.alert(
        "Draft is Empty",
        "Please type something in your post to generate hashtags.",
      );
      return;
    }

    try {
      const result = await composeAI({
        action: "hashtags",
        content: currentContent,
        count: 6,
      });

      if (result.hashtags && result.hashtags.length > 0) {
        setHashtags(result.hashtags);
      } else {
        showMessage("No hashtags generated. Try again.", "error");
      }
    } catch (err: any) {
      showMessage(err.message || "Failed to generate hashtags", "error");
    }
  };

  const handleGenerateCaption = async () => {
    if (!ideaTopic.trim()) {
      Alert.alert(
        "Topic Needed",
        "Please enter an idea or topic to generate a post.",
      );
      return;
    }

    try {
      const result = await composeAI({
        action: "caption",
        topic: ideaTopic,
        tone: selectedTone,
      });

      if (result.captions && result.captions.length > 0) {
        setCaptions(result.captions);
      } else {
        showMessage("No captions generated. Try again.", "error");
      }
    } catch (err: any) {
      showMessage(err.message || "Failed to generate caption", "error");
    }
  };

  const applyText = (text: string) => {
    onApplyContent(text);
    showMessage("Applied to post! ✨", "success");
    onClose();
  };

  const appendHashtag = (tag: string) => {
    const space = currentContent.endsWith(" ") || !currentContent ? "" : " ";
    onApplyContent(`${currentContent}${space}${tag}`);
    showMessage(`Added ${tag}`, "success");
  };

  const appendAllHashtags = () => {
    if (hashtags.length === 0) return;
    const space = currentContent.endsWith(" ") || !currentContent ? "" : " ";
    const tagsString = hashtags.join(" ");
    onApplyContent(`${currentContent}${space}${tagsString}`);
    showMessage("All hashtags added!", "success");
    onClose();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={onClose}
      containerStyle={{
        backgroundColor: "#161320",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: "90%",
      }}
    >
      <SafeAreaView edges={["bottom"]}>
        <View style={styles.container}>

          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.aiBadge}>
                <MaterialCommunityIcons
                  name="creation"
                  size={18}
                  color="#bf94ff"
                />
              </View>
              <View>
                <SCText varient="bold" size={17} color="#FFFFFF">
                  AI Post Assistant
                </SCText>
                <SCText varient="regular" size={12} color="#A59EBD">
                  LangChain + OpenRouter
                </SCText>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>


          <View style={styles.tabBar}>
            <TouchableOpacity
              onPress={() => setActiveTab("enhance")}
              style={[
                styles.tabItem,
                activeTab === "enhance" && styles.tabItemActive,
              ]}
            >
              <MaterialCommunityIcons
                name="auto-fix"
                size={16}
                color={activeTab === "enhance" ? "#FFFFFF" : "#A59EBD"}
              />
              <SCText
                varient={activeTab === "enhance" ? "semibold" : "regular"}
                size={13}
                color={activeTab === "enhance" ? "#FFFFFF" : "#A59EBD"}
              >
                Enhance
              </SCText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("hashtags")}
              style={[
                styles.tabItem,
                activeTab === "hashtags" && styles.tabItemActive,
              ]}
            >
              <Feather
                name="hash"
                size={15}
                color={activeTab === "hashtags" ? "#FFFFFF" : "#A59EBD"}
              />
              <SCText
                varient={activeTab === "hashtags" ? "semibold" : "regular"}
                size={13}
                color={activeTab === "hashtags" ? "#FFFFFF" : "#A59EBD"}
              >
                Hashtags
              </SCText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("caption")}
              style={[
                styles.tabItem,
                activeTab === "caption" && styles.tabItemActive,
              ]}
            >
              <Feather
                name="zap"
                size={15}
                color={activeTab === "caption" ? "#FFFFFF" : "#A59EBD"}
              />
              <SCText
                varient={activeTab === "caption" ? "semibold" : "regular"}
                size={13}
                color={activeTab === "caption" ? "#FFFFFF" : "#A59EBD"}
              >
                Ideas
              </SCText>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={{ paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
          >

            {activeTab === "enhance" && (
              <View>
                <View style={styles.draftBox}>
                  <SCText
                    varient="medium"
                    size={12}
                    color="#A59EBD"
                    style={{ marginBottom: 4 }}
                  >
                    CURRENT DRAFT
                  </SCText>
                  <SCText
                    varient="regular"
                    size={14}
                    color={currentContent ? "#FFFFFF" : "#657786"}
                    numberOfLines={3}
                  >
                    {currentContent.trim() ||
                      "Your post is currently empty. Type something in the composer to enhance it."}
                  </SCText>
                </View>

                {/* Tone Chips */}
                <SCText
                  varient="semibold"
                  size={13}
                  color="#E0E2F4"
                  style={styles.sectionTitle}
                >
                  Choose Tone
                </SCText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tonesRow}
                >
                  {TONES.map((tone) => {
                    const isSelected = selectedTone === tone.id;
                    return (
                      <TouchableOpacity
                        key={tone.id}
                        onPress={() => setSelectedTone(tone.id)}
                        style={[
                          styles.toneChip,
                          isSelected && styles.toneChipActive,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={tone.icon as any}
                          size={14}
                          color={isSelected ? "#FFFFFF" : "#CFCCDC"}
                        />
                        <SCText
                          varient={isSelected ? "semibold" : "regular"}
                          size={12}
                          color={isSelected ? "#FFFFFF" : "#CFCCDC"}
                        >
                          {tone.label}
                        </SCText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>


                <TouchableOpacity
                  onPress={handleEnhance}
                  disabled={isPending || !currentContent.trim()}
                  style={[
                    styles.primaryBtn,
                    (!currentContent.trim() || isPending) &&
                    styles.btnDisabled,
                  ]}
                >
                  {isPending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <MaterialCommunityIcons
                        name="creation"
                        size={18}
                        color="#FFFFFF"
                      />
                      <SCText varient="bold" size={14} color="#FFFFFF">
                        Enhance Post
                      </SCText>
                    </>
                  )}
                </TouchableOpacity>


                {suggestions.length > 0 && (
                  <View style={styles.resultsContainer}>
                    <SCText
                      varient="bold"
                      size={14}
                      color="#E0E2F4"
                      style={{ marginBottom: 10 }}
                    >
                      Suggestions:
                    </SCText>
                    {suggestions.map((item, index) => (
                      <View key={index} style={styles.suggestionCard}>
                        <View style={styles.suggestionHeader}>
                          <View style={styles.toneBadge}>
                            <SCText varient="semibold" size={11} color="#bf94ff">
                              {item.tone || "Option"}
                            </SCText>
                          </View>
                          <TouchableOpacity
                            onPress={() => applyText(item.text)}
                            style={styles.applyBtn}
                          >
                            <Feather name="check" size={13} color="#FFFFFF" />
                            <SCText varient="bold" size={12} color="#FFFFFF">
                              Use this
                            </SCText>
                          </TouchableOpacity>
                        </View>
                        <SCText
                          varient="regular"
                          size={14}
                          color="#F3F4F6"
                          style={{ lineHeight: 20 }}
                        >
                          {item.text}
                        </SCText>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}


            {activeTab === "hashtags" && (
              <View>
                <View style={styles.draftBox}>
                  <SCText
                    varient="medium"
                    size={12}
                    color="#A59EBD"
                    style={{ marginBottom: 4 }}
                  >
                    POST DRAFT
                  </SCText>
                  <SCText
                    varient="regular"
                    size={14}
                    color={currentContent ? "#FFFFFF" : "#657786"}
                    numberOfLines={3}
                  >
                    {currentContent.trim() ||
                      "Type a post in the composer first, then generate matching hashtags."}
                  </SCText>
                </View>

                <TouchableOpacity
                  onPress={handleGenerateHashtags}
                  disabled={isPending || !currentContent.trim()}
                  style={[
                    styles.primaryBtn,
                    (!currentContent.trim() || isPending) &&
                    styles.btnDisabled,
                  ]}
                >
                  {isPending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Feather name="hash" size={17} color="#FFFFFF" />
                      <SCText varient="bold" size={14} color="#FFFFFF">
                        Generate Hashtags
                      </SCText>
                    </>
                  )}
                </TouchableOpacity>

                {hashtags.length > 0 && (
                  <View style={styles.resultsContainer}>
                    <View style={styles.hashtagsHeaderRow}>
                      <SCText varient="bold" size={14} color="#E0E2F4">
                        Tap tag to add:
                      </SCText>
                      <TouchableOpacity
                        onPress={appendAllHashtags}
                        style={styles.applyAllBtn}
                      >
                        <SCText varient="bold" size={12} color="#bf94ff">
                          + Add All
                        </SCText>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.hashtagsWrap}>
                      {hashtags.map((tag, idx) => (
                        <TouchableOpacity
                          key={idx}
                          onPress={() => appendHashtag(tag)}
                          style={styles.hashtagPill}
                        >
                          <SCText varient="medium" size={13} color="#FFFFFF">
                            {tag}
                          </SCText>
                          <Feather
                            name="plus"
                            size={12}
                            color="#bf94ff"
                            style={{ marginLeft: 4 }}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}


            {activeTab === "caption" && (
              <View>
                <SCText
                  varient="semibold"
                  size={13}
                  color="#E0E2F4"
                  style={{ marginBottom: 6 }}
                >
                  What is your post about?
                </SCText>
                <TextInput
                  placeholder="e.g. Just launched dark mode for HamperApp, working on new features..."
                  placeholderTextColor="#657786"
                  multiline
                  value={ideaTopic}
                  onChangeText={setIdeaTopic}
                  style={styles.topicInput}
                />

                <SCText
                  varient="semibold"
                  size={13}
                  color="#E0E2F4"
                  style={styles.sectionTitle}
                >
                  Choose Tone
                </SCText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tonesRow}
                >
                  {TONES.map((tone) => {
                    const isSelected = selectedTone === tone.id;
                    return (
                      <TouchableOpacity
                        key={tone.id}
                        onPress={() => setSelectedTone(tone.id)}
                        style={[
                          styles.toneChip,
                          isSelected && styles.toneChipActive,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={tone.icon as any}
                          size={14}
                          color={isSelected ? "#FFFFFF" : "#CFCCDC"}
                        />
                        <SCText
                          varient={isSelected ? "semibold" : "regular"}
                          size={12}
                          color={isSelected ? "#FFFFFF" : "#CFCCDC"}
                        >
                          {tone.label}
                        </SCText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <TouchableOpacity
                  onPress={handleGenerateCaption}
                  disabled={isPending || !ideaTopic.trim()}
                  style={[
                    styles.primaryBtn,
                    (!ideaTopic.trim() || isPending) && styles.btnDisabled,
                  ]}
                >
                  {isPending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Feather name="zap" size={17} color="#FFFFFF" />
                      <SCText varient="bold" size={14} color="#FFFFFF">
                        Generate Posts
                      </SCText>
                    </>
                  )}
                </TouchableOpacity>

                {captions.length > 0 && (
                  <View style={styles.resultsContainer}>
                    <SCText
                      varient="bold"
                      size={14}
                      color="#E0E2F4"
                      style={{ marginBottom: 10 }}
                    >
                      Generated Posts:
                    </SCText>
                    {captions.map((item, index) => (
                      <View key={index} style={styles.suggestionCard}>
                        <View style={styles.suggestionHeader}>
                          <SCText varient="medium" size={12} color="#A59EBD">
                            Option {index + 1}
                          </SCText>
                          <TouchableOpacity
                            onPress={() => applyText(item.text)}
                            style={styles.applyBtn}
                          >
                            <Feather name="check" size={13} color="#FFFFFF" />
                            <SCText varient="bold" size={12} color="#FFFFFF">
                              Use Post
                            </SCText>
                          </TouchableOpacity>
                        </View>
                        <SCText
                          varient="regular"
                          size={14}
                          color="#F3F4F6"
                          style={{ lineHeight: 20 }}
                        >
                          {item.text}
                        </SCText>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ActionSheet>
  );
};

export default AIAssistantModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  aiBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(145, 71, 255, 0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 6,
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: "#9147ff",
  },
  scrollContent: {
    maxHeight: 460,
  },
  draftBox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 14,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  tonesRow: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 14,
  },
  toneChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  toneChipActive: {
    backgroundColor: "#6420c8",
    borderColor: "#bf94ff",
  },
  primaryBtn: {
    backgroundColor: "#9147ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 4,
    shadowColor: "#9147ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    shadowOpacity: 0,
    elevation: 0,
  },
  topicInput: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 14,
  },
  resultsContainer: {
    marginTop: 20,
  },
  suggestionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  suggestionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  toneBadge: {
    backgroundColor: "rgba(191, 148, 255, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  applyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#3B82F6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  hashtagsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  applyAllBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(191, 148, 255, 0.12)",
  },
  hashtagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  hashtagPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(145, 71, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(191, 148, 255, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
  },
});
