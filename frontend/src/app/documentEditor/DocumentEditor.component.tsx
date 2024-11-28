import {Modal, Upload} from "antd";
import {RootState} from "app/redux/store";
import {UserRole} from "app/redux/userRole/UserRole.type";
import {ActionsBar} from "components/DocumentEditor/ActionsBar/ActionsBar.component";
import {EditorView, EditorViewProps} from "components/DocumentEditor/EditorView/EditorView.component";
import {TextTools} from "components/DocumentEditor/TextTools/TextTools.component";
import {Header} from "components/Header/Header.component";
import {DocumentItem, mapIcon} from "components/Sidebar/Menu/Menu.utils";
import {mockDocumentsResponse} from "components/Sidebar/Menu/mockResponses";
import {Sidebar} from "components/Sidebar/Sidebar.component";
import {SidebarType} from "components/Sidebar/Sidebar.utils";
import React, {FC, ReactElement, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {StyledDocumentEditor} from "./DocumentEditor.style";
import { DocumentEditorService } from "./DocumentEditor.service";

export const DocumentEditor: FC = (): ReactElement => {
	const editorViewRef = useRef<EditorViewProps>(null);

	const [uploadVisible, setUploadVisible] = useState<boolean>(false);
	const [documents, setDocuments] = useState<DocumentItem[]>([]);
	const [editorContent, setEditorContent] = useState<string>("");

	const role: UserRole = useSelector((state: RootState) => state.user.role);
	const isAdmin: boolean = role === UserRole.ROLE_ADMIN;

	useEffect(() => {
		fetchDocuments();
	}, []);

	const fetchDocuments = async () => {
		const data: DocumentItem[] = mockDocumentsResponse.map((item) => ({
			...item,
			icon: mapIcon(item.icon),
			children:
				"children" in item
					? (item.children as DocumentItem[])?.map((child: DocumentItem) => ({
							...child,
							icon: mapIcon(child.icon),
					  }))
					: undefined,
		}));
		setDocuments(data);
	};

	const fetchEditorContent = async () => {
        const response = await DocumentEditorService.getLegalActs();
        
    };

	const handleMenuClick = ({key}: {key: string}) => {
		if (isAdmin && key === "1") {
			setUploadVisible(true);
		}
	};

	return (
		<StyledDocumentEditor>
			<div className="w-3/12 h-full">
				<Sidebar type={SidebarType.DOCUMENTS} menuItems={documents} onMainMenuClickHandler={handleMenuClick} />
			</div>
			<div className="w-9/12 flex flex-col">
				<Header />
				<div className="w-full flex-grow flex justify-end h-full">
					<div className="w-9/12 h-[90%]">
						<TextTools editorRef={editorViewRef} />
						<EditorView ref={editorViewRef} />
					</div>
					<div className="w-3/12 h-full">
						<ActionsBar />
					</div>
				</div>
			</div>

			{isAdmin && (
				<Modal
					open={uploadVisible}
					title="Dodaj nowy dokument"
					onCancel={() => setUploadVisible(false)}
					footer={null}
					centered={true}>
					<Upload />
				</Modal>
			)}
		</StyledDocumentEditor>
	);
};
