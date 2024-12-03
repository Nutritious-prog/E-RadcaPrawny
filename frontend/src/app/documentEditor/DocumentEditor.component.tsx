import {Modal, Upload} from "antd";
import {RootState} from "app/redux/store";
import {UserRole} from "app/redux/userRole/UserRole.type";
import {ActionsBar} from "components/DocumentEditor/ActionsBar/ActionsBar.component";
import {EditorView, EditorViewProps} from "components/DocumentEditor/EditorView/EditorView.component";
import {TextTools} from "components/DocumentEditor/TextTools/TextTools.component";
import {Header} from "components/Header/Header.component";
import {DocumentItem, MenuItem} from "components/Sidebar/Menu/Menu.utils";
import {Sidebar} from "components/Sidebar/Sidebar.component";
import {SidebarType} from "components/Sidebar/Sidebar.utils";
import React, {FC, ReactElement, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {StyledDocumentEditor} from "./DocumentEditor.style";
import {DocumentEditorService} from "./DocumentEditor.service";
import {FormOutlined} from "@ant-design/icons";
import {LegalActContentDTO, LegalActDTO, LegalActTagDTO} from "./DocumentEditor.dto";
import {toast} from "react-toastify";

export const DocumentEditor: FC = (): ReactElement => {
    const editorViewRef = useRef<EditorViewProps>(null);

    const [uploadVisible, setUploadVisible] = useState<boolean>(false);
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [editorContent, setEditorContent] = useState<string>("");
    const [legalActs, setLegalActs] = useState<LegalActDTO[]>([]);
    const [selectedTags, setSelectedTags] = useState<LegalActTagDTO[]>([]);
    const [selectedActId, setSelectedActId] = useState<number | null>(null);

    const role: UserRole = useSelector((state: RootState) => state.user.role);
    const token: string = useSelector((state: RootState) => state.user.token);
    const isAdmin: boolean = role === UserRole.ROLE_ADMIN;

    useEffect(() => {
        fetchLegalActs();
    }, []);

    const fetchLegalActs = async (): Promise<LegalActDTO[]> => {
        const response = await DocumentEditorService.getLegalActs(token);
        if (response.success) {
            const legalActs = response.response;
            const documentItems: MenuItem[] = legalActs.map((act) => ({
                key: act.id.toString(),
                icon: <FormOutlined />,
                label: act.title,
            }));
            setDocuments(documentItems);
            setLegalActs(legalActs);
            return legalActs;
        }
        return [];
    };

    const refreshDocumentState = async (selectedActIdToPreserve: number | null) => {
        const legalActs = await fetchLegalActs();

        const selectedAct = selectedActIdToPreserve
            ? legalActs.find((act) => act.id === selectedActIdToPreserve)
            : legalActs[0];

        if (selectedAct) {
            setEditorContent(selectedAct.textContent || "");
            setSelectedTags(selectedAct.legalActTags);
            setSelectedActId(selectedAct.id);
        }
    };


    const handleMenuClick = ({key}: { key: string }) => {
        const selectedAct = legalActs.find((act) => act.id.toString() === key);
        if (selectedAct) {
            setEditorContent(selectedAct.textContent || "");
            setSelectedTags(selectedAct.legalActTags);
            setSelectedActId(selectedAct.id);
        }
    };

    const handleTagChange = (nextSelectedTags: string[]) => {
        const updatedTags = nextSelectedTags.map(
            (tagName) =>
                ({
                    tag: {
                        id: selectedActId,
                        name: tagName,
                    }
                }) as LegalActTagDTO
        );
        setSelectedTags(updatedTags);
    };

    const handleContentChange = (content: string) => {
        setEditorContent(content);
    };

    const handleSave = async () => {
        if (selectedActId !== null) {
            const updatedContentDTO: LegalActContentDTO = {
                content: editorContent,
            };

            try {
                const response = await DocumentEditorService.updateLegalActContent(selectedActId, updatedContentDTO);
                if (response.success) {
                    toast.success("Zaktualizowano treść dokumentu");

                    if (isAdmin) {
                        const updatedTags = selectedTags.map((tag) => ({
                            name: tag.tag.name,
                        }));

                        const currentTags = legalActs.find((act) => act.id === selectedActId)!.legalActTags;
                        const currentTagNames = currentTags.map((tag) => tag.tag.name);
                        const newTagNames = updatedTags.map((tag) => tag.name);

                        const tagsToAdd = updatedTags.filter((tag) => !currentTagNames.includes(tag.name));
                        const tagsToRemove = currentTags
                            .filter((tag) => !newTagNames.includes(tag.tag.name))
                            .map((tagDTO) => ({ name: tagDTO.tag.name }));

                        if (tagsToRemove.length > 0) {
                            const removeResponse = await DocumentEditorService.removeMultipleTagsFromLegalAct(
                                selectedActId,
                                tagsToRemove
                            );
                            if (removeResponse.success) toast.success("Poprawnie usunięto tagi");
                        }
                        if (tagsToAdd.length > 0) {
                            const addTagResponse =
                                tagsToAdd.length === 1
                                    ? await DocumentEditorService.addTagToLegalAct(selectedActId, tagsToAdd[0])
                                    : await DocumentEditorService.addMultipleTagsToLegalAct(selectedActId, tagsToAdd);
                            if (addTagResponse.success) {
                                toast.success(`Dodano nowe tagi (${tagsToAdd.length})`);
                            }
                        }
                    }
                    await refreshDocumentState(selectedActId);
                } else {
                    toast.error("Błąd podczas aktualizacji treści dokumentu");
                }
            } catch (error) {
                toast.error("Błąd podczas aktualizacji treści dokumentu");
            }
        }
    };


    return (
        <StyledDocumentEditor>
            <div className="w-3/12 h-full">
                <Sidebar type={SidebarType.DOCUMENTS} menuItems={documents} onMainMenuClickHandler={handleMenuClick}/>
            </div>
            <div className="w-9/12 flex flex-col">
                <Header/>
                <div className="w-full flex-grow flex justify-end h-full">
                    <div className="w-9/12 h-[90%]">
                        {/*<TextTools editorRef={editorViewRef} />*/}
                        <EditorView
                            ref={editorViewRef}
                            editorContent={editorContent}
                            onContentChange={handleContentChange}
                        />
                    </div>
                    <div className="w-3/12 h-full">
                        <ActionsBar tags={selectedTags} onSave={handleSave} onTagChange={handleTagChange}/>
                    </div>
                </div>
            </div>

            {isAdmin && (
                <Modal
                    open={uploadVisible}
                    title="Dodaj nowy dokument"
                    onCancel={() => setUploadVisible(false)}
                    footer={null}
                    centered={true}
                >
                    <Upload/>
                </Modal>
            )}
        </StyledDocumentEditor>
    );
};
