"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import './styles.css'

/* Lexical Design System */
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";

/* Lexical Plugins Local */
import ToolbarPlugin from "./plugins/toolbar-plugin";
import AutoLinkPlugin from "./plugins/auto-link-plugin";
import CodeHighlightPlugin from "./plugins/code-highlight-plugin";

/* Lexical Plugins Remote */
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";

/* Lexical Others */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ExampleTheme from "./themes";
import { type EditorState, type SerializedEditorState } from "lexical";

/* Lexical Texts */
import { textDailyStandup } from "./text-daily-standup";
import YouTubePlugin from "./plugins/youtube-plugin";
import { YouTubeNode } from "./nodes/youtube-node";
import AutoEmbedPlugin from "./plugins/auto-embed-plugin";
import { ImageNode } from "./nodes/image-node";
import ImagesPlugin from "./plugins/image-plugin";
import { EmojiNode } from "./nodes/emoji-node";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  namespace: "daily-standup-editor",
  editorState: textDailyStandup,
  // Handling of errors during update
  onError(error: unknown) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    YouTubeNode,
    ImageNode,
    EmojiNode,
  ],
};
export type EditorContentType = SerializedEditorState | undefined;
export default function Editor({
  jsonState,
  setJsonState,
}: {
  jsonState: EditorContentType;
  setJsonState: Dispatch<SetStateAction<EditorContentType>>;
}): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  function onChange(
    state: EditorState,
    setJsonState: React.Dispatch<React.SetStateAction<EditorContentType>>
  ) {
    state.read(() => {
      if (state.isEmpty()) {
        setJsonState(undefined);
        return;
      }
      setJsonState(state.toJSON());
    });
  }

  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editorState: JSON.stringify(jsonState),
      }}
    >
      <div className="w-full border rounded-lg">
        <div className="border-b">
          <ToolbarPlugin />
        </div>
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin
            onChange={(editor) => onChange(editor, setJsonState)}
          />
          <AutoEmbedPlugin />
          <AutoFocusPlugin />
          <HistoryPlugin />
          <LinkPlugin />
          <ListPlugin />
          <CodeHighlightPlugin />
          <TabIndentationPlugin />
          <AutoLinkPlugin />
          <YouTubePlugin />
          <ImagesPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          {/* <TreeViewPlugin /> */}
        </div>
      </div>
    </LexicalComposer>
  );
}
