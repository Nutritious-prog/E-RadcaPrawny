import { ChatItem, DocumentItem } from "./Menu.component";

export const mockDocumentsResponse: DocumentItem[] = [
    {
        key: "1",
        icon: "PlusOutlined",
        label: "Dodaj ustawę do systemu",
    },
    {
        key: "2",
        icon: "FileTextOutlined",
        label: "Ustawy i rozporządzenia w kraju",
        children: [
            {
                key: "3",
                icon: "FormOutlined",
                label: "Ustawa o podatku dochodowym dla firm w Polsce",
            },
            {
                key: "4",
                icon: "FormOutlined",
                label: "Rozporządzenie o ochronie danych osobowych w Polsce",
            },
            {
                key: "5",
                icon: "FormOutlined",
                label: "Prawo przedsiębiorców w Polsce i Unii Europejskiej",
            },
            {
                key: "6",
                icon: "FormOutlined",
                label: "Ustawa o zdrowiu publicznym w Polsce i Unii Europejskiej",
            },
            {
                key: "7",
                icon: "FormOutlined",
                label: "Rozporządzenie o edukacji narodowej w Polsce",
            },
            {
                key: "8",
                icon: "FormOutlined",
                label: "Prawo zatrudnienia młodocianych pracowników",
            },
        ],
    },
];

export const mockChatResponse: ChatItem[] = [
    {
        key: "1",
        icon: "PlusOutlined",
        label: "Nowa konwersacja z prawnikiem",
    },
    {
        key: "2",
        icon: "MessageOutlined",
        label: "Wytłumaczenie podatków dla firm w Polsce",
    },
    {
        key: "3",
        icon: "MessageOutlined",
        label: "Pytanie o prawa pracownicze w Polsce",
    },
    {
        key: "4",
        icon: "MessageOutlined",
        label: "Oszustwo podatkowe w firmie w Polsce",
    },
    {
        key: "5",
        icon: "MessageOutlined",
        label: "Przepisy BHP w zakładzie pracy w Polsce",
    },
    {
        key: "6",
        icon: "MessageOutlined",
        label: "Jakie są obowiązki pracodawcy w Polsce?",
    },
    {
        key: "7",
        icon: "MessageOutlined",
        label: "Nowe regulacje prawne w Polsce i Unii Europejskiej",
    },
    {
        key: "8",
        icon: "MessageOutlined",
        label: "Zmiana przepisów dotyczących pracy w Polsce",
    },
];