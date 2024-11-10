import { ChatItem, DocumentItem } from "./Menu.component";

export const mockDocumentsResponse: DocumentItem[] = [
    {
        key: "1",
        icon: "PlusOutlined",
        label: "Dodaj ustawę",
    },
    {
        key: "2",
        icon: "FileTextOutlined",
        label: "Ustawy i rozporządzenia",
        children: [
            {
                key: "3",
                icon: "FormOutlined",
                label: "Ustawa o podatku...",
            },
            {
                key: "4",
                icon: "FormOutlined",
                label: "Rozporządzenie o ochronie...",
            },
            {
                key: "5",
                icon: "FormOutlined",
                label: "Prawo przedsiębiorców...",
            },
            {
                key: "6",
                icon: "FormOutlined",
                label: "Ustawa o zdrowiu...",
            },
            {
                key: "7",
                icon: "FormOutlined",
                label: "Rozporządzenie o edukacji...",
            },
            {
                key: "8",
                icon: "FormOutlined",
                label: "Prawo zatrudnienia młodocianych...",
            },
        ],
    },
];

export const mockChatResponse: ChatItem[] = [
    {
        key: "1",
        icon: "PlusOutlined",
        label: "Nowa konwersacja",
    },
    {
        key: "2",
        icon: "MessageOutlined",
        label: "Wytłumaczenie podatków...",
    },
    {
        key: "3",
        icon: "MessageOutlined",
        label: "Pytanie o prawa...",
    },
    {
        key: "4",
        icon: "MessageOutlined",
        label: "Oszustwo podatkowe...",
    },
    {
        key: "5",
        icon: "MessageOutlined",
        label: "Przepisy BHP...",
    },
    {
        key: "6",
        icon: "MessageOutlined",
        label: "Jakie są obowiązki...",
    },
    {
        key: "7",
        icon: "MessageOutlined",
        label: "Nowe regulacje...",
    },
    {
        key: "8",
        icon: "MessageOutlined",
        label: "Zmiana przepisów..",
    },
];